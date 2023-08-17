import './App.css';
import { useState } from 'react';

const App = () => {
  const [cards, setCards] = useState([
    {id: 1, order: 1, suit: 'Hearts' , pickture: 'https://cdn.trendhunterstatic.com/thumbs/connie-lim-fashion-playing-cards.jpeg?auto=webp'},
    {id: 2, order: 2, suit: 'Spades' , pickture: 'https://ih1.redbubble.net/image.1045938263.1925/flat,750x,075,f-pad,750x1000,f8f8f8.jpg'},
    {id: 3, order: 3, suit: 'Diamonds' , pickture: 'https://playingcardcollector.files.wordpress.com/2013/05/jamie_tyndall_the_ace_of_diamonds.jpg'},
    {id: 4, order: 4, suit: 'Clubs' , pickture: 'https://i.pinimg.com/236x/67/48/8a/67488a530a67103dec90d7efadccb425.jpg'}
  ])

  const [currentCard, setCurrentCard] = useState(null);

  function dragStartHandler(e, card) {
    console.log('drag', card);
    setCurrentCard(card);
  };

  function dragEndHandler(e) {
    //e.target.style.backgroundImage = 'url(https://pifium.ru/image/cache/catalog/rubashki/11350-200x365.jpg)';
  };

  function dragOverHandler(e) {
    e.preventDefault();// отключить действия браузера по умолчанию
    //e.target.style.backgroundImage = `url(${currentCard.pickture})`;
  };

  function dropHandler(e, card) {
    e.preventDefault();
    setCards(cards.map(c => {
      if (c.id === card.id) { //если текущий элемент массива и его id = карточке в которую мы закидываем, то присваиваем ей порядок той, которую держим
        return {...c, order: currentCard.order};
      }
      if (c.id === currentCard.id) { //если id ранен той которую мы держим, то порядок меняем на ту что снизу.
        return {...c, order: card.order};
      }
      return c;
    }))
    //e.target.style.backgroundImage = 'url(https://pifium.ru/image/cache/catalog/rubashki/11350-200x365.jpg)';
  };

  const sortCards = (a,b) => {
    if(a.order > b.order) {
      return 1;
    } else {
      return -1;
    }
  }

  return (
    <div className="app">
      <div className="cards">
      {cards.sort(sortCards).map(card => 
        <div 
          className='card' 
          onDragStart={(e) => dragStartHandler(e, card)} //срабатывает когда взяли карточку
          onDragLeave={(e) => dragEndHandler(e)} //вышли за пределы другой карточки
          onDragEnd={(e) => dragEndHandler(e)} //отпустили перемещение
          onDragOver={(e) => dragOverHandler(e)} //находимся над другим обьектом
          onDrop={(e) => dropHandler(e, card)} //отпустили и ждем связанное действие
          draggable={true}
          style={{backgroundImage: `url(${card.pickture})`}}>
            <div className='card-header'>{card.name}</div>
        </div>
      )}
      </div>
    </div>
  );
}

export default App;
