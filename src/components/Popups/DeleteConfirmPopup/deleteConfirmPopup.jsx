import styled from 'styled-components';
import Modal from 'react-modal';
import { onDeleteUser } from '../../../slices/userlist.slice';
import { useDispatch } from 'react-redux';

/**---------------- Styles ------------------*/
const modalStyle = {
	overlay: {},
	content: {
		top: '50%',
		left: '50%',
		height: 'fit-content',
		width: '300px',
		border: 'none',
		boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2), 0 3px 10px rgba(0, 0, 0, 0.19)',
		transform: 'translate(-50%,-50%)',
	},
};

const TextWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	padding: 10px;
`;

const P = styled.p`
	font-size: 130%;
`;

const ButtonWrapper = styled.div`
	display: flex;
	width: fit-content;
	margin: 10px auto 10px auto;
`;

const iconStyle = {
	fontSize: '150%',
	marginRight: '10px',
};

export default function DeleteModal(props) {
	const dispatch = useDispatch();
	return (
		<Modal style={modalStyle} isOpen={props.isOpen} onRequestClose={props.onRequestClose}>
			<TextWrapper>
				<ion-icon style={iconStyle} name="alert-circle-outline"></ion-icon>
				<P>Are you sure?</P>
			</TextWrapper>
			<ButtonWrapper>
				{props.onDelete ? (
					<button style={{ marginRight: '10px' }} className="button-danger" onClick={props.onDelete}>
						Delete
					</button>
				) : (
					<button
						style={{ marginRight: '10px' }}
						className="button-danger"
						onClick={() => dispatch(onDeleteUser({ id: props.id }))}
					>
						Delete
					</button>
				)}

				<button style={{ marginLeft: '10px' }} className="button-danger-secondary" onClick={props.onRequestClose}>
					Cancel
				</button>
			</ButtonWrapper>
		</Modal>
	);
}
