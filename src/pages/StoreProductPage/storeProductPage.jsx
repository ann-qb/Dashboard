import { useState } from 'react';
import styled from 'styled-components';
import StoreHeader from '../../components/StoreHeader';
import Placeholder from '../../assets/Images/placeholder.jpg';
import Button from '@material-ui/core/Button';
import AddShoppingCartOutlinedIcon from '@material-ui/icons/AddShoppingCartOutlined';
import ShopOutlinedIcon from '@material-ui/icons/ShopOutlined';
import StoreFooter from '../../components/StoreFooter';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
	button: {
		backgroundColor: '#5673E8',
		color: '#fff',
		'&:hover': {
			transition: '0.2s ease',
			color: '#000',
			backgroundColor: '#d6dcf9',
		},
	},
}));

const ProductContentWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
	height: fit-content;
	padding: 15px;
`;
const ProductImageWrapper = styled.div`
	display: flex;
	align-item: center;
	width: 49%;
`;
const ProductImage = styled.img`
	width: 100%;
	height: auto;
`;
const ProductDetailsWrapper = styled.div`
	width: 50%;
	padding: 10px;
`;
const ProductTittle = styled.p`
	margin-bottom: 10px;
	font-size: 150%;
	color: #000;
`;
const ProductBrand = styled.p`
	margin-bottom: 20px;
	font-size: 120%;
`;
const ProductDescription = styled.p`
	margin-bottom: 10px;
	font-size: 100%;
`;
const ProductPrice = styled.p`
	margin-bottom: 10px;
`;
const PriceNumber = styled.span`
	font-size: 130%;
	color: #34c38f;
`;
const ProductStock = styled.p`
	width: fit-content;
	margin-bottom: 20px;
	padding: 2px 10px;
	color: #34c38f;
	border-radius: 2px;
	background-color: #eee;
`;
const ButtonBox = styled.div`
	display: flex;
	width: fit-content;
	height: fit-content;
`;

export default function StoreProductPage(props) {
	const classes = useStyles()
	const [productToCart, setProductToCart] = useState(null);

	const addToCart = () => {
		const existingNumber = localStorage.getItem('productsInCart');
		let newNumber;
		existingNumber ? (newNumber = parseInt(existingNumber) + 1) : (newNumber = 1);

		localStorage.setItem('productsInCart', newNumber);
		setProductToCart(newNumber);
	};
	return (
		<div style={{ backgroundColor: '#fff', color: '#020001' }}>
			<StoreHeader itemsInCart={productToCart} />
			<ProductContentWrapper>
				<ProductImageWrapper>
					<ProductImage src={Placeholder} alt="Product Image" />
				</ProductImageWrapper>
				<ProductDetailsWrapper>
					<ProductTittle>Product tittle</ProductTittle>
					<ProductBrand>Product Brand</ProductBrand>
					<ProductDescription>
						Product Description Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus quibusdam pariatur optio
						molestias vitae beatae facilis reprehenderit illo quo. Laboriosam error dolorum delectus porro veritatis
						vero deserunt commodi, inventore hic.
					</ProductDescription>
					<ProductPrice>
						Offer price: <PriceNumber>₹ 16666</PriceNumber>
					</ProductPrice>
					<ProductStock>In Stock</ProductStock>
					<ButtonBox>
						<Button
							style={{ marginRight: '10px' }}
							variant="contained"
							className={classes.button}
							startIcon={<AddShoppingCartOutlinedIcon />}
							onClick={addToCart}
						>
							Add To Cart
						</Button>
						<Button variant="contained" className={classes.button} startIcon={<ShopOutlinedIcon />}>
							Order Now
						</Button>
					</ButtonBox>
				</ProductDetailsWrapper>
			</ProductContentWrapper>
			<StoreFooter/>
		</div>
	);
}