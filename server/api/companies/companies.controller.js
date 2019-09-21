const getAllCompanies = async (req, res) => {
  const db = req.app.get("db");

  try {
    let response = await db.companies.get_all_companies();
    console.log(response);
    res.status(200).json(response);
  } catch (e) {
    console.log(e);
  }
};

module.exports = { getAllCompanies };
