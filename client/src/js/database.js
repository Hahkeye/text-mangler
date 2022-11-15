import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });


  //Fucntions to save to the database
export const putDb = async (content) => {
  const noted = await openDB('jate', 1);
  const action = noted.transaction("jate", 'readwrite');
  const store = action.objectStore('jate');

  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log(result);
  console.log('🚀 - data saved to the database', result.value);
};


//Function to get stuff from the database
export const getDb = async () => {
  const noted = await openDB('jate', 1);
  const action = noted.transaction("jate", 'readonly');
  const store = action.objectStore('jate');

  const request = store.get(1);
  const result = await request;
  result
    ? console.log('🚀 - data retrieved from the database', result.value)
    : console.log('🚀 - data not found in the database');
  return result?.value;
};

initdb();
