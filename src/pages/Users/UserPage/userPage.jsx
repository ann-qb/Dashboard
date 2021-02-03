import styled from 'styled-components';
import UserCard from './UserCard';
import { useEffect, useState } from 'react';
import ShowIfAuth from '../../../components/ShowIfAuth';
import AlertPopup from '../../../components/Popups/AlertPopups';
import EditPopup from '../../../components/Popups/EditPopup';
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
const AddButton = styled.button`
	margin-top: 15px;
`;

const UserCardHeadWrapper = styled.div`
	display: flex;
	width: 100%;
	margin: 8px 0;
	margin-top: 15px;
	padding: 0 10px;
	// background-color: #fff;
`;

const UserCardHeaders = styled.div`
	display: flex;
	width: 100%;
	height: 100%;
`;

const HeaderTab = styled.div`
	width: 25%;
`;

export default function UserPage(props) {
	const [alertDisplay, setAlertDisplay] = useState(false);
	const [alertType, setAlertType] = useState('');
	const [alertMessage, setAlertMessage] = useState('');
	const [addUserPopup, setAddUserPopup] = useState(false);
	const [showLoading, setShowLoading] = useState(false);

	const { userList, status } = useSelector((state) => state.userListSlice);
	const dispatch = useDispatch();

	useEffect(() => dispatch(onGetUserList()), []);

	useEffect(() => {
		if (status === 'loading user list') {
			setShowLoading(true);
		} else if (status === 'loading user list over') {
			setShowLoading(false);
		}
	}, [status]);

	useEffect(() => {
		if (!addUserPopup && status === 'add user success') {
			setAlertType('success');
			setAlertMessage('User added successfully!');
			showAlertPopup();
		} else if (!addUserPopup && status === 'add user failed') {
			setAlertType('error');
			setAlertMessage('Could not add user');
			showAlertPopup();
		}
	}, [addUserPopup, status]);

	useEffect(() => {
		if (status === 'delete user success') {
			setAlertType('success');
			setAlertMessage('User deleted successfully!');
			showAlertPopup();
		} else if (status === 'delete user failed') {
			setAlertType('error');
			setAlertMessage('Could not delete user');
			showAlertPopup();
		}
	}, [status]);

	const createCards = () => {
		return (
			<>
				{!showLoading
					? userList
							.filter(
								(each) =>
									(!each.Role || each.Role.name !== 'admin') &&
									(each.firstname.toLowerCase().includes(props.searchValue.toLowerCase()) ||
										each.lastname.toLowerCase().includes(props.searchValue.toLowerCase()))
							)
							.map((each) => <UserCard key={each.id} data={each} />)
					: null}
			</>
		);
	};

	const openAddUserPopup = () => {
		setAddUserPopup(true);
	};

	const closeAddUserPopup = () => {
		setAddUserPopup(false);
	};

	const showAlertPopup = () => {
		setAlertDisplay(true);
	};

	// Additional function to be written wherever AlertPopup component is used
	if (alertDisplay) {
		setTimeout(() => {
			setAlertDisplay(false);
		}, 5000);
	}

	// Spinner div style (dynamic display)
	let display = 'flex';
	showLoading ? (display = 'flex') : (display = 'none');

	const SpinnerDiv = styled.div`
		display: ${display};
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 200px;
		margin: auto 0;
	`;

	return (
		<PageContainer>
			<AlertPopup alertType={alertType} message={alertMessage} display={alertDisplay} />

			<p className="pageHeaders blackFont">Users</p>
			<ShowIfAuth allowedRoles={['admin']}>
				<AddButton className="button-primary" onClick={openAddUserPopup}>
					+ Add Users
				</AddButton>
			</ShowIfAuth>

			<UserCardHeadWrapper>
				<UserCardHeaders>
					<HeaderTab style={{ width: '30%' }}>
						<p className="blackFont">User</p>
					</HeaderTab>
					<HeaderTab style={{ width: '50%' }}>
						<p className="blackFont">Email</p>
					</HeaderTab>
					<HeaderTab>
						<p className="blackFont">Status</p>
					</HeaderTab>
				</UserCardHeaders>

				<ShowIfAuth allowedRoles={['admin']}>
					<p className="blackFont">Actions</p>
				</ShowIfAuth>
			</UserCardHeadWrapper>

			<SpinnerDiv>
				<BounceLoader size={100} color={'#5673E8'} loading={showLoading} />
			</SpinnerDiv>
			{createCards()}

			<EditPopup isOpen={addUserPopup} onRequestClose={closeAddUserPopup} title="Add User" />
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