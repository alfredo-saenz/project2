import { useEffect, useState } from 'react';
import SearchForm from './components/SearchForm';
import SearchResults from './components/SearchResults';
import './App.css';
import RecipeDetails from './components/RecipeDetails';
import { Route, Routes, Link } from 'react-router-dom';

function App() {
	const [search, setSearch] = useState('');
	const [recipes, setRecipes] = useState([]);
	const searchOptions = {
		key: process.env.REACT_APP_EDAMAM_KEY,
		limit: 25,
		api: 'https://api.edamam.com',
		endpoint: '/api/recipes/v2',
		appID: '6a8184b2',
	};
	function getRecipes(search) {
		const url = `${searchOptions.api}${searchOptions.endpoint}?q=${search}&app_id=${searchOptions.appID}&app_key=${searchOptions.key}&type=public`;

		fetch(url)
			.then((res) => res.json())
			.then((res) => {
				setRecipes(res.hits);
				console.log(res);
			})
			.catch(console.error);
	}
	function handleChange(event) {
		event.preventDefault();
		setSearch(event.target.value);
	}
	function handleSubmit(event) {
		event.preventDefault();
		console.log(event.target);
		getRecipes(search);
		setSearch('');
	}
	useEffect(() => {
		// getRecipes(search);
	}, []);

	return (
		<body>
			<header></header>
			<Routes>
				<Route
					path='/'
					element={
						<main>
							<div className='container'>
								<SearchForm
									handleChange={handleChange}
									handleSubmit={handleSubmit}
									search={search}
								/>
								<SearchResults recipes={recipes} />
							</div>
						</main>
					}
				/>
				<Route path='details/:id' element={<RecipeDetails />} />
				{/* <Route path='component' element={<SearchResults recipes={recipes} />} /> */}
			</Routes>
		</body>
	);
}

export default App;
