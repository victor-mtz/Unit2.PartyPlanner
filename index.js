const COHORT = '2310-FSA-ET-WEB-PT-SF';
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events`;

/*
cohortId: 87,
date: 2024-01-07T12:20:44.000Z,
description: "Ullam doloribus ut tempora cumque aliquam dignissimos numquam voluptatum. Similique aut dolore cumque similique adipisci a exercitationem facilis. Harum tempora praesentium laborum optio voluptatem.",
id: 844,
location: 41353 Koss Key,
name: unleash extensible systems
*/
const state = {
  events: [],
};

const eventList = document.querySelector('#events');

const addEventForm = document.querySelector('#addEvent');
addEventForm.addEventListener('submit', addEvent);

state.events.forEach((event, i) => {
  const deleteBtn = document.createElement('button');
  deleteBtn.addEventListener('click', (e) => {
    console.log(e.target);
  });
});

async function render() {
  await getEvents();
  renderEvents();
}
render();

async function getEvents() {
  try {
    const apiResponse = await fetch(API_URL);
    const deserializedData = await apiResponse.json();
    state.events = [...deserializedData.data];
    console.log(state);
  } catch (error) {
    console.error(error);
  }
}

async function deleteEvent(id) {
  try {
    const deleteObject = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    await getEvents();
  } catch (error) {
    console.error(error);
  } finally {
    render();
  }
}

async function renderEvents() {
  if (!state.events.length) {
    artistList.innerHTML = '<li>No events found</li>';
    return;
  }

  const eventCards = state.events.map((partyEvent, i) => {
    const li = document.createElement('li');
    const id = partyEvent.id;
    li.innerHTML = `<h2>${partyEvent.name.toUpperCase()}</h2>
    <h3>${partyEvent.date}</h3>
    <h3>${partyEvent.location}</h3>
    <p>${partyEvent.description}</p>
    <button id="delete-button" onclick=deleteEvent(${id})>Delete</>`;
    return li;
  });
  eventList.replaceChildren(...eventCards);
}

async function addEvent(event) {
  event.preventDefault();
  console.log(event);
  try {
    const data = {
      name: addEventForm.name.value,
      description: addEventForm.description.value,
      date: addEventForm.date.value,
      location: addEventForm.location.value,
    };
    const response = await fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify({ ...data }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error);
  } finally {
    render();
  }
}
