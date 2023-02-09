export default function handler(req, res) {

  try {
    const { index, geometry } = req.query;
    fetch(`http://192.168.100.17:8000/index?index=${index}&geometry=${geometry}`)
      .then((response) => response.text())
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  }
  catch (error) {
    res.status(500).json(error);
  }
}
