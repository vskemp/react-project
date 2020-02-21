
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
class Statement1 extends React.Component {
    render() {
        return (
            <div className="statement1">
                <h2>Common Phrases:</h2>
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

class YourName extends  React.Component {
    render() {
        return (
            <div className="your-name">
                <li>What is your name?</li>
            </div>
        );
    }
}

class HowAre extends React.Component {
    render() {
        return (
            <div className="well">
                <li>How are you?</li>
            </div>
        );
    }
}

class Bathroom extends React.Component {
    render() {
        return (
            <div className="bathroom">
                <li>Where is the bathroom?</li>
            </div>
        );
    }
}

class Thank extends React.Component {
    render() {
        return (
            <div className="thank">
                <li>Thank you</li>
            </div>
        );
    }
}

class Yes extends React.Component {
    render() {
        return (
            <div> className="yes"
                <li>Yes</li>
            </div>
        );
    }
}
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
            : "Common Phrases:",
        hello: cookie.load({Hello})
            ? cookie.load({Hello})
            : "Hello, my name is...",
        yourname: cookie.load({YourName})
            ? cookie.load({YourName})
            : "What is your name?",
        wellness: cookie.load({HowAre})
            ? cookie.load({HowAre})
            : "How are you?",
        bathroom: cookie.load({Bathroom})
            ? cookie.load({Bathroom})
            : "Where is the bathroom?",
        thank: cookie.load({Thank})
            ? cookie.load({Thank})
            : "Thank you",
        yes: cookie.load({Yes})
            ? cookie.load({Yes})
            : "Yes",
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
        const { languageCodes, 
                language, 
                question, 
                head, 
                statement1, 
                hello, 
                yourname,
                wellness,
                bathroom,
                thank,
                yes,
                } = this.state;

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
                    {statement1}
                    <ul><li>{hello}</li>
                        <li>{yourname}</li>
                        <li>{wellness}</li>
                        <li>{bathroom}</li>
                        <li>{thank}</li>
                        <li>{yes}</li>
                    </ul>
                    <Footer />
            </div>
        );
    }

    changeHandler = language => {
        let { yes } = this.state;
        let { thank } = this.state;
        let { bathroom } = this.state;
        let { wellness } = this.state;
        let { yourname } = this.state;
        let { hello } = this.state;
        let { statement1 } = this.state;
        let { head } = this.state;
        let { question } = this.state;
        let cookieLanguage = cookie.load("language");
        let transQuestion = "";
        let transHead= "";
        let transState1="";
        let transHello="";
        let transName = "";
        let transWell= "";
        let transBath= "";
        let transThank= "";
        let transYes= "";

        const thankTranslating= transThank => {
            if(thank !== transThank) {
                this.setState({thank: transThank});
                cookie.save("thank", transThank, {path: "/"});
            }
        };
        const bathTranslating = transBath => {
            if(bathroom !== transBath) {
                this.setState({bathroom: transBath});
                cookie.save("bathroom", transBath, {path: "/"});
            }
        };
        const wellTranslating = transWell => {
            if(wellness !== transWell) {
                this.setState({ wellness: transWell });
                cookie.save("wellness", transWell, {path:"/"});
            }
        };
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
        const nameTranslating = transName => {
            if (yourname !== transName) {
                this.setState({yourname: transName});
                cookie.save("yourname", transName, {path:"/"});
            }
        };
        const yesTranslating = transYes => {
            if (yes !== transYes) {
                this.setState({yes: transYes});
                cookie.save("yes", transYes, {path:"/"});
            }
        };

        // translate the question when selecting a different language
        if (language !==  cookieLanguage) {
            googleTranslate.translate(yes, language, function (err, translation) {
                transYes = translation.translatedText;
                yesTranslating(transYes);
            });
        }
        if (language !== cookieLanguage) {
            googleTranslate.translate(thank, language, function (err, translation) {
                transThank = translation.translatedText;
                thankTranslating(transThank);
            });
        }
        if (language !== cookieLanguage) {
            googleTranslate.translate(bathroom, language, function (err, translation) {
                transBath = translation.translatedText;
                bathTranslating(transBath);
            }); 
        }
        if (language !== cookieLanguage) {
            googleTranslate.translate(wellness, language, function (err, translation) {
                transWell = translation.translatedText;
                wellTranslating(transWell);
            });
        }
        if (language !==cookieLanguage) {
            googleTranslate.translate(yourname, language, function (err, translation) {
                transName = translation.translatedText;
                nameTranslating(transName);
            });
        }
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

