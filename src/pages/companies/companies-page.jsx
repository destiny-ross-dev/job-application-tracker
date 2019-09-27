import React, { useState, useEffect } from "react";
import FormInput from "../../components/input-field/input-field";
import axios from "axios";
import { isEmpty } from "../../utils";
import { connect } from "react-redux";

let alphabet = [...Array(26).keys()].map(i => String.fromCharCode(i + 65));

const NewApplicationPage = ({ history, menuExpanded }) => {
  const [companiesList, setCompaniesList] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const list = await axios.get(`/companies`);
      setCompaniesList(list.data);
    }

    fetchData();
  }, []);
  console.log(alphabet);
  const alphabetizedList = [
    {
      A: [
        {
          name: "Apple",
          city: "San Francisco",
          logo: "https://t1.rbxcdn.com/194fb681e5f5deb47a79566d0bdf3df5"
        }
      ]
    },
    {
      B: [
        {
          name: "BNSF Logistics",
          city: "Fairlawn",
          logo:
            "http://business.itbusinessnet.com/wp-content/uploads/2019/03/a3603851-ec58-4b8f-a8fd-323d4ccdc38b-1024x478.png"
        }
      ]
    },
    {
      C: [
        {
          name: "Centerbase",
          city: "Dallas",

          logo:
            "https://www.centerbase.com/wp-content/uploads/2018/04/Centerbase_Vertical_Final-01.png"
        },
        {
          name: "Chick-Fil-A",
          city: "Atlanta",
          logo:
            "http://cfayounglife5k.com/styles/images/sponsorlogos/chickfila.png"
        }
      ]
    },
    { D: [] },
    { E: [] },
    { F: [] },
    {
      G: [
        {
          name: "Google",
          city: "Seattle",
          logo: "http://assets.stickpng.com/thumbs/5847f9cbcef1014c0b5e48c8.png"
        }
      ]
    },
    { H: [] },
    { I: [] },
    { J: [] },
    { K: [] },
    { L: [] },
    { M: [] },
    { N: [] },
    { O: [] },
    { P: [] },
    { Q: [] },
    { R: [] },
    {
      S: [
        {
          name: "SKYCATCHFIRE",
          city: "Canton",
          logo: "https://www.skycatchfire.com/assets/img/global/logo-header.png"
        }
      ]
    },
    { T: [] },
    { U: [] },
    { V: [] },
    { W: [] },
    { X: [] },
    { Y: [] },
    { Z: [] }
  ];
  return (
    <div
      className={`CompaniesPage ${
        menuExpanded
          ? "PageContainer"
          : "PageContainer PageContainer--maximized"
      }`}
    >
      <h1>Companies Directory</h1>
      <div className="Directory__Search">
        <h2>Search Component</h2>
        <div>
          {alphabet.map((e, i) => {
            return (
              <p onClick={() => console.log(e)} key={e + "-" + i}>
                {e}
              </p>
            );
          })}
        </div>
      </div>
      {alphabetizedList.map((letter, i) => {
        for (let n in letter) {
          return (
            <div className="Directory__Section">
              <h3 className="Directory__SectionHeader">{n}</h3>
              <div className="Directory__CompaniesContainer">
                {letter[n].map((e, i) => {
                  return (
                    <div className="Directory__Company">
                      {/* <img src={e.logo} /> */}
                      <div>
                        <h3>{e.name}</h3>
                        <p>{e.city}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        }
        return;
      })}
    </div>
  );
};
const mapStateToProps = state => {
  return {
    menuExpanded: state.settings.menuExpanded
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewApplicationPage);
