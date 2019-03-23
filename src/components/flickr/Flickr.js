import React, { Component } from 'react';
import axios from 'axios';
import API_KEY from '../config';
import './Flickr.css';

class Flickr extends Component{

    constructor(props) {
        super(props);
        this.state = {
            flickrPics: []
        };
        this.loadImage = this.loadImage.bind(this)
    }

    componentDidMount() {
        axios.get('/?method=flickr.photos.getRecent&api_key='+ {API_KEY} +'&format=json&nojsoncallback=1')
            .then(response => {
                this.setState({
                    flickrPics: response.data.photos.photo
                });
                console.log(this.state.flickrPics)
            })
    }

    loadImage(e) {
        const current = document.querySelector('#current');
        const opacity = 0.4;
        this.state.flickrPics.forEach(() => (current.style.opacity = 1));
        current.src = e.target.src;
        current.classList.add('fade-in');
        setTimeout(() => current.classList.remove('fade-in'), 500);
        e.target.style.opacity = opacity;
    }

    render() {
        return (
            <div className="container">
                <div className="main-img">
                    {
                        Object.values(this.state.flickrPics).slice(0,1).map(item => {
                            const farm_id = item.farm;
                            const server_id = item.server;
                            const id = item.id;
                            const secret = item.secret;
                            const url = "https://farm" + farm_id + ".staticflickr.com/" + server_id + "/" + id + "_" + secret + ".jpg";
                            return (
                                <img src={url} alt="" id="current" />
                            )
                        })
                    }
                </div>
                <div className="imgs">
                    {
                        Object.values(this.state.flickrPics).map(item => {
                            return (
                                <FlickImageUrl
                                    farm={item.farm}
                                    server_id={item.server}
                                    secret={item.secret}
                                    id={item.id}
                                    click={this.loadImage}
                                    opacity={1}
                                />
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

const FlickImageUrl = (props) => {
    const farm_id = props.farm;
    const server_id = props.server_id;
    const id = props.id;
    const secret = props.secret;
    const url = "https://farm" + farm_id + ".staticflickr.com/" + server_id + "/" + id + "_" + secret + ".jpg";

    return (
        <img src={url} alt="" onClick={props.click} />
    )
};

export default Flickr;
