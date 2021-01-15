import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

const useStyle = makeStyles({
	textField: {
		width: '100%',
  },
  leftButton:{
    marginRight:'15px'
  }
});

const PageContainer = styled.div`
	position: relative;
	padding: 15px;
	height: 90vh;
	overflow: scroll;
`;

const FlexWrapper = styled.div`
	display: flex;
	height: 100%;
	justify-content: space-between;
	padding: 0;
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	width: 50%;
	height: 90%;
	margin-top: 20px;
	padding: 10px 25px;
	overflow: scroll;
`;
const FormHeader = styled.p`
  margin-bottom:20px;
  font-size:120%;
  color:#000;
`
const MainGroup = styled.div`
	display: flex;
	// flex-direction: column;
	justify-content: space-between;
	width: 100%;
`;
const ItemGroup = styled.div`
	width: 49%;
	margin-bottom: 15px;
`;
const FullWidthItemGroup = styled.div`
	width: 100%;
	height: fit-content;
`;
const PreviewWrapper = styled.div`
	width: 49%;
	height: 90%;
	margin-top: 20px;
	padding: 10px 25px;
	overflow: scroll;
`;
const ButtonGroup = styled.div`
  display:flex;
  justify-content:space-between;
  width:fit-content;
  margin:10px auto;
`

const CATAGORIES = [
	{ name: 'Cloths', id: 1},
	{ name: 'Food', id: 2 },
	{ name: 'Medicines', id: 3 },
	{ name: 'Electronics', id: 4 },
];

export default function AddProducts(props) {
	const classes = useStyle();
	return (
		<PageContainer>
			<p className="pageHeaders blackFont">Add Products</p>
			<FlexWrapper>
				<Form className="cards">
					<FormHeader>Details</FormHeader>
					<MainGroup>
						<ItemGroup>
							<TextField className={classes.textField} label="Brand Name" variant="outlined" color="#5673E8" />
						</ItemGroup>
						<ItemGroup>
							<TextField className={classes.textField} label="product Name" variant="outlined" color="#5673E8" />
						</ItemGroup>
					</MainGroup>
					<MainGroup>
						<ItemGroup>
							<TextField className={classes.textField} label="price Name" variant="outlined" color="#5673E8" />
						</ItemGroup>
						<ItemGroup>
							<TextField className={classes.textField} label="Discount Percentage" variant="outlined" color="#5673E8" />
						</ItemGroup>
					</MainGroup>

					<MainGroup>
						<ItemGroup>
							<TextField className={classes.textField} label="Status" variant="outlined" color="#5673E8" />
						</ItemGroup>
						<ItemGroup>
							<TextField className={classes.textField} label="Quantity" variant="outlined" color="#5673E8" />
						</ItemGroup>
					</MainGroup>
					<MainGroup>
						<ItemGroup>
							<TextField
								className={classes.textField}
								label="Category"
								variant="outlined"
								select
								value=""
								color="#5673E8"
							>
								{CATAGORIES.map((item) => (
									<MenuItem key={item.id} value={item.name}>
										{item.name}
									</MenuItem>
								))}
							</TextField>
						</ItemGroup>
						<ItemGroup>
							<TextField className={classes.textField} label="Sub Category" variant="outlined" color="#5673E8" />
						</ItemGroup>
					</MainGroup>
					<MainGroup>
						<FullWidthItemGroup>
							<TextField
								className={classes.textField}
								label="Description"
								variant="outlined"
								color="#5673E8"
								multiline
								rowsMax={4}
							/>
						</FullWidthItemGroup>
					</MainGroup>

					<ButtonGroup>
						<Button className={classes.leftButton} variant="contained" color="#5673E8" disableElevation>
							Primary
						</Button>
						<Button variant="outlined" color="#5673E8">
							Secondary
						</Button>
					</ButtonGroup>
				</Form>

				<PreviewWrapper className="cards">
					<p>Preview</p>
				</PreviewWrapper>
			</FlexWrapper>
		</PageContainer>
	);
}
/**
 * const useStyle = makeStyles({
	textField: {
		width: '100%',
		'&:hover': { width: '500px' },
	},
});
 */
