import React from "react";
import Header from "./Header";
import "./memestyles.css";
class MemeGen extends React.Component {
  constructor() {
    super();

    this.state = {
      submitted: false,
      topText: "",
      bottomText: "",
      randomImage: "http://i.imgflip.com/1bij.jpg",
      allmemeimgs: [],
      img: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.pickrandom = this.pickrandom.bind(this);
  }

  async componentDidMount() {
    try {
      const response = await fetch("https://api.imgflip.com/get_memes");
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const data = await response.json();
      //   console.log(data); // Log the data variable to the console
      const memedata = data.data.memes;
      const memesimages = memedata.map((img) => {
        return img.url;
      });
      // console.log("allmemeimgs:", memesimages);
      this.setState({ allmemeimgs: memesimages });
    } catch (error) {
      console.error("Error:", error);
    }
  }

  handleChange(evt) {
    // We can use array econstruction for getting the values or we could do it by using Method-1
    // but by using this deconstruction we can use many properties at once while as by using Method-1
    // we will have to repeatedly write evt.target. properties we'll use
    // Also notice we use [on name] or [evt.target.name] that is because evt.target.name returns an
    // array and to acces it we use [] this is just how form events work

    const { name, value } = evt.target;
    this.setState({ [name]: value });
    // Method-1
    // this.setState({[evt.target.name]:evt.target.value})
    // console.log([evt.target.name])
  }

  pickrandom(evt) {
    evt.preventDefault();
    this.setState({ submitted: true });
    let randomIndex = Math.floor(Math.random() * this.state.allmemeimgs.length);
    let randimg = this.state.allmemeimgs[randomIndex];
    this.setState({ randomImage: randimg });
  }

  render() {
    return (
      <div>
        <div className="meme-container">
          {this.state.allmemeimgs.length > 0 && (
            <img
              className="random-meme"
              src={this.state.randomImage}
              alt="image"
            />
          )}
          <div className="text-container">
            <p className="text top">{this.state.topText}</p>
            <p className="text bottom">{this.state.bottomText}</p>
          </div>
        </div>

        <form onSubmit={this.pickrandom}>
          <input
            className="input-text"
            type="text"
            name="topText"
            value={this.state.topText}
            onChange={this.handleChange}
            placeholder="TopText"
          />{" "}
          <br />
          <input
            className="input-text"
            type="text"
            name="bottomText"
            value={this.state.bottomText}
            onChange={this.handleChange}
            placeholder="bottomText"
          />{" "}
          <br />
          <button type="submit">Generate</button>
        </form>
      </div>
    );
  }
}

export default MemeGen;
