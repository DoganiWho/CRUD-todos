export const handler = async () => {
  

  const response = await fetch(TODOS_API)
  const data = await response.json()

  return {
    statusCode: 200,
    body: JSON.stringify({
      data
    })
  }
};


const axios = require('axios');

const TODOS_API = 'https://eu-central-1.aws.data.mongodb-api.com/app/data-vhqez/endpoint/data/v1/action/findOne'
const collection = 'todos'
const API_KEY = '81njqmufVUmjR7yLoKNDUt97iRSoFwGwuPxonb9A9tNkew1AylvqyR6BKOdMWXsw'

const data = JSON.stringify({
  "collection": `${collection}`,
  "database": "todos",
  "dataSource": "todo-notes",
  "projection": {
      "_id": 1
  }
});
            
const config = {
  method: 'post',
  url: `${TODOS_API}`,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Request-Headers': '*',
    'api-key': `${API_KEY}`,
    'Accept': 'application/ejson',
  },
  data: data
};
            
axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });