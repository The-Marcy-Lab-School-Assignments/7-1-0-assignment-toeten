import { useState, useContext } from 'react';
import PokemonContext from '../context/PokemonContext';
import handleFetch from '../utils/handleFetch';

const PokemonForm = () => {
  const { setAllPokemon } = useContext(PokemonContext);
  const [formData, setFormData] = useState({
    name: '',
    hp: '',
    front: '',
    back: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newPokemon = {
      id: Date.now(), // or use a more sophisticated ID generation method
      ...formData
    };

    try {
      const [response, error] = await handleFetch('http://localhost:4000/pokemon', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPokemon)
      });

      if (error) {
        console.error('Error adding Pokemon:', error);
        return;
      }

      setAllPokemon(prevAllPokemon => [...prevAllPokemon, response]);
      setFormData({
        name: '',
        hp: '',
        front: '',
        back: ''
      });
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  };

  return (
    <div>
      <h3>Add a Pokemon!</h3>
      <form className="ui form" onSubmit={handleSubmit}>
        <div className="four fields" widths="equal">
          <div className="field ui fluid">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="field ui fluid">
            <label>HP</label>
            <input
              type="text"
              name="hp"
              placeholder="HP"
              value={formData.hp}
              onChange={handleChange}
            />
          </div>
          <div className="field ui fluid">
            <label>Front Image URL</label>
            <input
              type="text"
              name="front"
              placeholder="url"
              value={formData.front}
              onChange={handleChange}
            />
          </div>
          <div className="field ui fluid">
            <label>Back Image URL</label>
            <input
              type="text"
              name="back"
              placeholder="url"
              value={formData.back}
              onChange={handleChange}
            />
          </div>
        </div>
        <button className="ui button" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PokemonForm;

