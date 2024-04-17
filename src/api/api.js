const API_BASE_URL = 'https://api.videosdk.live/v2';

export const getToken = async () => {
  return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI2YzU4Zjg2Zi0zNWUyLTQxZGQtOTZiOC00YzZlZjg1ZmNlMmEiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcxMzI4OTU0NSwiZXhwIjoxNzEzODk0MzQ1fQ.3hEz2HdkP0PC2CE4wUCztbNeouGEzmkjwndBXfeh0UM"
};

export const createMeeting = async ({token}) => {
  const url = `${API_BASE_URL}/rooms`;
  const options = {
    method: 'POST',
    headers: {Authorization: token, 'Content-Type': 'application/json'},
  };

  const {roomId} = await fetch(url, options)
    .then(response => response.json())
    .catch(error => console.error('error', error));

  console.log('room', roomId);
  return roomId;
};
