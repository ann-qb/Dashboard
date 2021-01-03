import { useState } from 'react';
import styled from 'styled-components';

/** Expected props
 * ------------------------
 * width
 * margin
 * height
 */

export default function PasswordField(props) {
	//------------- Styles --------------//
	const InputField = styled.input`
		width: 100%;
		height: 100%;
	`;

	const InputDiv = styled.div`
		position: relative;
		width: ${props.width};
		margin: ${props.margin};
		height: ${props.height};
	`;

	const eyeIconStyle = {
		position: 'absolute',
		top: '50%',
		right: '5px',
		transform: 'translate(-50%,-50%)',
		color: '#000',
		cursor: 'pointer',
	};

	//------------- States --------------//
	const [passwordShown, setPasswordShown] = useState(false);
	const [fieldContent, setFieldContent] = useState(props.fieldValue);

	//------------- Methods --------------//
	const changePasswordState = () => {
		setPasswordShown(passwordShown ? false : true);
	};

	const saveFieldContent = (e) => {
		// Doesn't work without this
		let field = document.querySelector('#passwordInputField');
		setFieldContent(field.value);
		// Why is this not enough?
		props.onChange(e);
	};

	if (props.error) {
		var errorField = {
			border: '1px solid #f46a6a',
		};
	} else {
		var errorField = null;
	}

	return (
		<InputDiv>
			{passwordShown ? (
				<ion-icon style={eyeIconStyle} name="eye-outline" onClick={changePasswordState}></ion-icon>
			) : (
				<ion-icon style={eyeIconStyle} name="eye-off-outline" onClick={changePasswordState}></ion-icon>
			)}
			{console.log('Rerender')}
			{console.log('FV' + props.fieldValue)}
			{console.log('FC' + props.fieldContent)}
			<InputField
				id="passwordInputField"
				style={errorField}
				type={passwordShown ? 'text' : 'password'}
				value={fieldContent}
				onChange={saveFieldContent}
				autoFocus
			/>
		</InputDiv>
	);
}
