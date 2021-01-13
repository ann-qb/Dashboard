import styled from 'styled-components';
import { useEffect, useState } from 'react';
import ShowIfAuth from '../../../components/ShowIfAuth';
import AlertPopup from '../../../components/Popups/AlertPopups';
import EditPopup from '../../../components/Popups/EditPopup';
import StatCard from '../../../components/StatCards'
import { onGetUserList } from '../../../slices/userlist.slice';
import { useDispatch, useSelector } from 'react-redux';
import { BounceLoader } from 'react-spinners';
import { css } from '@emotion/react';

/**---------------- Styles ------------------*/
const PageContainer = styled.div`
	position: relative;
	padding: 15px;
	height: 90vh;
	overflow: scroll;
`;

const StatCardWrapper = styled.div`
	display:flex;
	justify-content:space-around;
	width:100%
	height:fit-content;
	margin:15px 0 20px 0;
`

export default function UserPage() {
	const [alertDisplay, setAlertDisplay] = useState(false);
	const [alertType, setAlertType] = useState('');
	const [alertMessage, setAlertMessage] = useState('');
	
	const [showLoading, setShowLoading] = useState(false);

	const { userList, status } = useSelector((state) => state.userListSlice);
	const dispatch = useDispatch();

	const [totalUsers, setTotalUsers] = useState(0);
	const [activeUsers, setActiveUsers] = useState(0);
	const [pendingUsers, setPendingUsers] = useState(0);
	const [inactiveUsers, setInactiveUsers] = useState(0);
	useEffect(() => {
		setTotalUsers(userList.length);
		setActiveUsers(userList.reduce((acc, item) => (item.status === 'active' ? acc + 1 : acc), 0));
		setPendingUsers(userList.reduce((acc, item) => (item.status === 'pending' ? acc + 1 : acc), 0));
		setInactiveUsers(userList.reduce((acc, item) => (item.status === 'inactive' ? acc + 1 : acc), 0));
	}, [userList]);

	console.log(totalUsers);
	console.log(activeUsers);
	console.log(pendingUsers);
	console.log(inactiveUsers);

	useEffect(() => dispatch(onGetUserList()), []);

	// Additional function to be written wherever AlertPopup component is used
	if (alertDisplay) {
		setTimeout(() => {
			setAlertDisplay(false);
		}, 5000);
	}


	return (
		<PageContainer>
			<AlertPopup alertType={alertType} message={alertMessage} display={alertDisplay} />
			<ShowIfAuth allowedRoles={['admin']}>
				<>
					<p className="pageHeaders blackFont">Stats</p>
					<StatCardWrapper>
						<StatCard type="users" count={totalUsers} />
						<StatCard type="active_users" count={activeUsers} />
						<StatCard type="pending_users" count={pendingUsers} />
						<StatCard type="inactive_users" count={inactiveUsers} />
					</StatCardWrapper>
				</>
			</ShowIfAuth>
		</PageContainer>
	);
}
//
const StyledBarLoader = css`
	width: 100%;
	display: block;
	margin: 0 auto;
	width: 100%;
`;
/**
position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%); */
