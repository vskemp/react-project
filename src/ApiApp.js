
import React, { Component } from "react";
import cookie from "react-cookies";
import { googleTranslate } from "./utils/googleTranslate";
import './ApiApp.css';



class Header extends React.Component {
    render() {
        return (
            <div className="head">
                <h1>Translator</h1>
            </div>

        );
    }
}

class UserInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        alert('A translation was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <form>
                <label>
                    Translate: 
                    <input type="text" placeholder="Enter English" />
                </label>
                <input type="submit" value="Submit" />
            </form>
        )
    };
}

class Statement1 extends React.Component {
    render() {
        return (
            <div className="statement1">
                <h2>Common Sample Phrases:</h2>
                        {/* <li>What is your name?</li>
                        <li>How are you?</li>
                        <li>Where is the bathroom?</li>
                        <li>Can you give me directions to...?</li>
                        <li>Thank you</li>
                        <li>Please</li>
                        <li>I am sorry</li>
                        <li>I do not understand</li>
                        <li>Goodbye</li>
                        <li>Can I have...?</li>
                        <li>How much does it cost?</li>
                        <li>Yes</li>
                        <li>No</li> */}
            </div>
        );
    }

}

class Hello extends React.Component {
    render() {
        return (
            <div className="hello">
                <li>Hello, my name is...</li>
            </div>
        );
    }
}

class YourName extends 

class Footer extends React.Component {
    render() {
        return (
            <div>
                <footer>Veronica Kemp</footer>
            </div>
        );
    }
}
class ApiApp extends Component {
    state = {
        languageCodes: [],
        language: cookie.load("language") ? cookie.load("language") : "en",
        question: cookie.load("What language would you like the page in?")
            ? cookie.load("question")
            : "What language would you like the page in?",
        head: cookie.load({Header})
            ? cookie.load({Header})
            : "Translator",
        statement1: cookie.load({Statement1})
            ? cookie.load({Statement1})
            : "Common Sample Phrases:",
        hello: cookie.load({Hello})
            ? cookie.load({Hello})
            : "Hello, my name is...",
    };

    componentDidMount() {
        // load all of the language options from Google Translate to your app state

        googleTranslate.getSupportedLanguages("en", function (err, languageCodes) {
            getLanguageCodes(languageCodes); // use a callback function to setState
        });

        const getLanguageCodes = languageCodes => {
            this.setState({ languageCodes });
            console.log(languageCodes);
        };
    }

    render() {
        const { languageCodes, language, question, head, statement1, hello} = this.state;

        return (
            <div>
                <div className = "head">
                    {head}
                </div>
                    <div style={this.transStyle}>
                        <p>{question}</p>
                        {/* iterate through language options to create a select box */}
                        <select
                            className="select-language"
                            value={language}
                            onChange={e => this.changeHandler(e.target.value)}
                        >
                            {languageCodes.map(lang => (
                                <option key={lang.language} value={lang.language}>
                                    {lang.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <UserInput />
                    {statement1}
                    <ul><li>{hello}</li></ul>
                    <Footer />
            </div>
        );
    }

    changeHandler = language => {
        let { hello } = this.state;
        let { statement1 } = this.state;
        let { head } = this.state;
        let { question } = this.state;
        let cookieLanguage = cookie.load("language");
        let transQuestion = "";
        let transHead= "";
        let transState1="";
        let transHello="";

        const headTranslating = transHead => {
            if(head !==transHead) {
                this.setState({ head: transHead});
                cookie.save("head", transHead, {path: "/"});
            }
        };
        const translating = transQuestion => {
            if (question !== transQuestion) {
                this.setState({ question: transQuestion });
                cookie.save("question", transQuestion, { path: "/" });
            }
        };
        const stateTranslating1 = transState1 => {
            if (statement1 !== transState1) {
                this.setState({statement1: transState1 });
                cookie.save("statement1", transState1, { path: "/"});
            }
        };
        const helloTranslating = transHello => {
            if (hello !== transHello) {
                this.setState({hello: transHello});
                cookie.save("hello", transHello, {path: "/"});
            }
        };

        // translate the question when selecting a different language
        if (language !== cookieLanguage) {
            googleTranslate.translate(head, language, function (err, translation) {
                transHead = translation.translatedText;
                headTranslating(transHead);
            });
        }
        if (language !== cookieLanguage) {
            googleTranslate.translate(question, language, function (err, translation) {
                transQuestion = translation.translatedText;
                translating(transQuestion);
            });
        }
        if (language !== cookieLanguage) {
            googleTranslate.translate(statement1, language, function (err, translation) {
                transState1 = translation.translatedText;
                stateTranslating1(transState1);
            });
        }
        if (language !== cookieLanguage) {
            googleTranslate.translate(hello, language, function (err, translation) {
                transHello = translation.translatedText;
                helloTranslating(transHello);
            })
        }

        this.setState({ language });
        cookie.save("language", language, { path: "/" });
    };

    transStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100wh"
    };

}


export default ApiApp;

