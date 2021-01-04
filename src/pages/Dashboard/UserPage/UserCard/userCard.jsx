import styled from 'styled-components';
import { useState } from 'react';
import ShowIfAuth from '../../../../components/ShowIfAuth';
import EditPopup from '../../../../components/Popups/EditPopup';
import DeleteConfirmPopup from '../../../../components/Popups/DeleteConfirmPopup';

export default function UserCard(props) {
	const status = 'active';

	const [editPopupIsOpen, setEditPopupIsOpen] = useState(false);
	const [deletePopupIsOpen, setDeletePopupIsOpen] = useState(false);

	if (status === 'active') {
		var bgColor = '#ccf0e8';
		var textColor = '#34c38f';
	} else if (status === 'pending') {
		var bgColor = '#dcdde2';
		var textColor = '#74788d';
	} else {
		var bgColor = '#fcdada';
		var textColor = '#f46a6a';
	}

	const CardContainer = styled.div`
		width: 100%;
		background-color: #fff;
		display: flex;
		margin: 10px 0;
		padding: 10px 10px;
	`;

	const UserTabs = styled.div`
		width: 100%;
		display: flex;
		height: 100%;
	`;

	const DetailsTabs = styled.div`
		width: 25%;
	`;

	const StatusText = styled.p`
		border: 1px solid ${textColor};
		width: fit-content;
		padding: 2px 5px;
		font-size: 70%;
		color: ${textColor};
		background-color: ${bgColor};
		border-radius: 50px 50px 50px 50px;
	`;

	const AdminTabs = styled.div`
    float:left;
  display:flex;
  background-color: ${bgColor}
  align-item: center;
  justify-content: center;
  `;

	const iconStyle = {
		color: '#000',
		fontSize: '120%',
		margin: '5px',
		cursor: 'pointer',
	};

	const generateModal = (e) => {
		if (e.target.id === 'edit_icon') {
			setEditPopupIsOpen(true);
		}
		else if(e.target.id === 'delete_icon'){
			console.warn('Delete Modal')
			setDeletePopupIsOpen(true)
		}
	};


	const closeEditModal = () => {
		setEditPopupIsOpen(false);
	};

	const closeDeleteModal = ()=>{
		setDeletePopupIsOpen(false)
	}

	const CreateAdminTaskTabs = () => {
		return (
			<AdminTabs>
				<ion-icon id="edit_icon" style={iconStyle} name="create-outline" onClick={generateModal}></ion-icon>
				<ion-icon id="delete_icon" style={iconStyle} name="trash-outline" onClick={generateModal}></ion-icon>
			</AdminTabs>
		);
	};

	return (
		<CardContainer>
			<UserTabs>
				<DetailsTabs>
					<p>Full Name</p>
				</DetailsTabs>
				<DetailsTabs>
					<p>Email</p>
				</DetailsTabs>
				<DetailsTabs>
					<StatusText>Status</StatusText>
				</DetailsTabs>
			</UserTabs>

			<ShowIfAuth role={props.role}>
				<CreateAdminTaskTabs />
			</ShowIfAuth>

			<EditPopup isOpen={editPopupIsOpen} onRequestClose={closeEditModal} />
			<DeleteConfirmPopup isOpen={deletePopupIsOpen} onRequestClose={closeDeleteModal}/>
		</CardContainer>
	);
}
