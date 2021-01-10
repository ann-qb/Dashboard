import styled from 'styled-components';
import { css } from '@emotion/react';
import PasswordField from '../PasswordField';
import Logo from '../../../assets/Images/logo_black.png';
import { BarLoader } from 'react-spinners';

//------------- Styles --------------//
const CardContainer = styled.div`
	position: absolute;
	top: 45%;
	left: 50%;
	width: 350px;
	height: fit-content;
	transform: translate(-50%, -50%);
`;

const Card = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 100%;
	padding: 35px 20px !important;
	text-align: center;
`;

const BarLoaderContainer = styled.div`
	width: 100%;
	height: fit-content;
	display: flex;
	// justify-content: center;
`;

const SubmitButton = styled.button`
	margin-right: 0;
`;

const Input = styled.input`
	display: block;
	height: 40px;
	width: 100%;
	margin: 20px 0 5px 0;
`;

const AlertText = styled.p`
	font-size: 80%;
	text-align:left;
`;

const ErrorText = styled.p`
	font-size: 80%;
	color: #f46a6a;
	width: fit-content;
`;

const StyledLogo = styled.img`
	width: 120px;
	height: auto;
	text-align: center;
`;

const ButtonHolder = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	margin-top: 10px;
`;

const SideLink = styled.p`
	color: #5673e8;
	cursor: pointer;
	font-size: 80%;
`;

/** Expected props
 * --------------------
 * cardHeader
 * cardType (password, text, number, new password)
 * buttonText
 * sideButton text
 */
export default function LoginCard(props) {
	if (props.errorMessage) {
		var errorField = {
			border: '1px solid #f46a6a',
		};
		var passwordError = true;
	} else {
		var errorField = null;
		var passwordError = false;
	}

	const changeInputBorderOnFocus = (e) => {
		const field = e.target;
		field.style.border = '1px solid #5673E8';
	};

	const changeInputBorderOnBlur = (e) => {
		const field = e.target;
		field.style.border = '1px solid #000';
	};

	const activateButton = (e) => {
		if (e.keyCode === 13) {
			props.onClick();
		}
	};

	return (
		<CardContainer>
			<BarLoaderContainer>
				<BarLoader css={StyledBarLoader} color="#5673E8" loading={props.loading} />
			</BarLoaderContainer>
			<Card className="cards">
				<span>
					<StyledLogo src={Logo} />
				</span>
				{props.cardType !== 'new password' ? (
					<>
						<p style={{ fontSize: '150%', marginTop: '10px', fontWeight: '500' }} className="blackFont">
							Sign In
						</p>
						<p style={{ fontSize: '85%' }} className="blackFont">
							to continue
						</p>
					</>
				) : (
					<p style={{ fontSize: '150%', marginTop: '10px' }}> Create Password </p>
				)}
				<FieldMaker
					{...{
						...props,
						errorField,
						passwordError,
						changeInputBorderOnFocus,
						changeInputBorderOnBlur,
						activateButton,
					}}
				/>
				<ErrorText> {props.errorMessage} </ErrorText>
				{props.cardType === 'new password' ? (
					<AlertText> Please make sure to double check the password before submitting! </AlertText>
				) : null}
				<ButtonHolder>
					<SideLink onClick={props.sideLinkOnClick}> {props.sideLinkText} </SideLink>
					<SubmitButton className="button-primary" disabled={props.buttonDisabled} onClick={() => props.onClick()}>
						{props.buttonText}
					</SubmitButton>
				</ButtonHolder>
			</Card>
		</CardContainer>
	);
}

const FieldMaker = (props) => {
	if (props.cardType === 'password' || props.cardType === 'new password') {
		return (
			<>
				<PasswordField
					margin="10px 0 5px 0"
					height="40px"
					value={props.value}
					onChange={props.onChange}
					isError={props.passwordError}
					onKeydown={props.activateButton}
				/>
				
			</>
		);
	} else {
		return (
			<Input
				onFocus={props.changeInputBorderOnFocus}
				onBlur={props.changeInputBorderOnBlur}
				style={props.errorField}
				type={props.cardType}
				value={props.value}
				onChange={props.onChange}
				placeholder={props.cardHeader}
				onKeyDown={props.activateButton}
				autoFocus
			/>
		);
	}
};

const StyledBarLoader = css`
	width: 100%;
`;
