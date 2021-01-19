import CategoryCard from './CategoryCards';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { onAddCategory } from '../../../slices/categorylist.slice';

const PageContainer = styled.div`
	position: relative;
	padding: 15px;
	height: 90vh;
	overflow: scroll;
`;

const AddCategoryWrapper = styled.div`
	padding: 10px;
	padding-left: 0;
	margin-top: 15px;
	margin-bottom: 5px;
`;
const Button = styled.button`
	height: 100%;
`;
const Input = styled.input`
	height: 100%;
	padding: 8px;
	margin-right: 15px;
	border: 0.2px solid #dcdde2;
`;

const categoriesArray = [
	{
		id: 0,
		name: 'Electronics',
		subcategories: [
			{
				id: 0,
				name: 'Mobile Accessories',
				category: 0,
			},
			{
				id: 1,
				name: 'Computer Peripherals',
				category: 0,
			},
			{
				id: 2,
				name: 'Laptop Accessories',
				category: 0,
			},
			{
				id: 3,
				name: 'Tablets',
				category: 0,
			},
		],
	},
	{
		id: 1,
		name: 'Fashion',
		subcategories: [
			{
				id: 0,
				name: 'Jeans',
				category: 1,
			},
			{
				id: 1,
				name: 'T-shirts',
				category: 1,
			},
			{
				id: 2,
				name: 'Dresses',
				category: 1,
			},
			{
				id: 3,
				name: 'Caps',
				category: 1,
			},
		],
	},
	{
		id: 2,
		name: 'Grocery',
		subcategories: [],
	},
	{
		id: 3,
		name: 'Mobiles',
		subcategories: [],
	},
];

export default function Categories() {
	const { categoryList } = useSelector((state) => state.categoryListSlice);
	const dispatch = useDispatch();

	const [disableAdd, setDisableAdd] = useState(true);
	const [newCategory, setNewCategory] = useState('');

	useEffect(() => {
		newCategory.trim().length !== 0 ? setDisableAdd(false) : setDisableAdd(true);
	}, [newCategory]);

	const handleInputChange = (e) => {
		setNewCategory(e.target.value);
	};

	const addNewCategory = () => {
		// dispatch(onAddCategory({ category: newCategory }));
		console.log({ category: newCategory });
	};

	return (
		<PageContainer>
			<p className="pageHeaders blackFont">Categories</p>
			<AddCategoryWrapper>
				<Input placeholder="Category" onChange={handleInputChange} />
				<Button className="button-primary" disabled={disableAdd} onClick={addNewCategory}>
					Add
				</Button>
			</AddCategoryWrapper>
			{categoriesArray.reverse().map((each) => (
				<CategoryCard key={each.id + each.name} category={each} />
			))}
			{categoryList.reverse().map((each) => (
				<CategoryCard key={each.id + each.name} category={each} />
			))}
		</PageContainer>
	);
}