import React, { useState } from 'react';
import { useLoadScript } from '@react-google-maps/api';

const libraries: 'places'[] = ['places'];

const PlacesSearch = () => {
	const [searchValue, setSearchValue] = useState('');
	const [places, setPlaces] = useState<any[]>([]);

	const { isLoaded, loadError } = useLoadScript({
		// googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
		googleMapsApiKey: 'AIzaSyBu7lzNDZ8I0UVQO6-NRxKchOQBhQ8YVOU',
		libraries,
	});
	const handleInputChange = async (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		setSearchValue(event.target.value);
		if (event.target.value.length > 3) {
			const service = new window.google.maps.places.AutocompleteService();
			service.getPlacePredictions(
				{ input: event.target.value },
				(predictions) => {
					if (predictions) {
						setPlaces(predictions);
					}
				},
			);
		}
	};

	if (loadError) return <div>Помилка завантаження карти</div>;
	if (!isLoaded) return <div>Завантаження...</div>;

	return (
		<div>
			<input
				type="text"
				value={searchValue}
				onChange={handleInputChange}
				placeholder="Введіть місце"
			/>
			<ul>
				{places.map((place, index) => (
					<li key={index}>{place.description}</li>
				))}
			</ul>
		</div>
	);
};

export default PlacesSearch;
