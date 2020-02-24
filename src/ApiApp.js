
import React, { Component } from "react";
import cookie from "react-cookies";
import { googleTranslate } from "./utils/googleTranslate";
import './ApiApp.css';
import Image from "./images/lang.png"
import axios from 'axios';

// classes for css editing and refrencing for translated text
// axios.post('https://translation.googleapis.com/v3/projects/western-dolphin-268714:translateText', { q: this.state.value })

class TranslateForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            translated: '',
        }
        this.translate = this.translate.bind(this);
    }
    translate() {
        console.log(this.state.value);
        // API KEY PURPOSELY LEFT OUT UNTIL DEPLOYMENT WITH BACKEND TO KEEP KEY SECURE. IF YOU WOULD LIKE TO RUN THIS, PLEASE GENERATE YOUR OWN API KEY ON GOOGLE
        axios.get(`https://translation.googleapis.com/language/translate/v2?target=${cookie.load("language")}&key==${this.state.value}`)
            .then(data => {
                console.log(data);
                this.setState({ translated: data.data.data.translations[0].translatedText })
                console.log(data.data.data.translations[0].translatedText)
            }).catch(err => {
                console.log('error')
            })
    }
    render() {
        return (
            <div>
                <input
                    placeholder="Enter English"
                    value={this.state.value}
                    onChange={(e) => this.setState({ value: e.target.value })}
                    type="text" />
                <button onClick={this.translate}>Submit</button>
                <h1>Your Translation:{this.state.translated}</h1>
            </div>
        );
    }
}




class Header extends React.Component {
    render() {
        return (
            <div>
                <h1>Translator</h1>
            </div>

        );
    }
}
class Statement1 extends React.Component {
    render() {
        return (
            <div>
                <h2>Common Phrases:</h2>
            </div>
        );
    }

}

class Hello extends React.Component {
    render() {
        return (
            <div>
                <li>Hello, my name is...</li>
            </div>
        );
    }
}

class YourName extends React.Component {
    render() {
        return (
            <div>
                <li>What is your name?</li>
            </div>
        );
    }
}

class HowAre extends React.Component {
    render() {
        return (
            <div>
                <li>How are you?</li>
            </div>
        );
    }
}

class Bathroom extends React.Component {
    render() {
        return (
            <div>
                <li>Where is the bathroom?</li>
            </div>
        );
    }
}

class Thank extends React.Component {
    render() {
        return (
            <div>
                <li>Thank you</li>
            </div>
        );
    }
}

class Yes extends React.Component {
    render() {
        return (
            <div>
                <li>Yes</li>
            </div>
        );
    }
}

class No extends React.Component {
    render() {
        return (
            <div>
                <li>No</li>
            </div>
        );
    }
}

class Understand extends React.Component {
    render() {
        return (
            <div>
                <li>I do not understand</li>
            </div>
        );
    }
}
class Question extends React.Component {
    render() {
        return (
            <div className="question">
                What language would you like the page in?
            </div>
        );
    }
}
class Footer extends React.Component {
    render() {
        return (
            <div className="footer">
                <footer>
                    <a href="https://www.linkedin.com/in/veronica-kemp-5748b2196/" target="_blank" rel="noopener noreferrer"> Veronica Kemp </a>
                    2020</footer>
            </div>
        );
    }
}

class ApiApp extends Component {
    state = {
        languageCodes: [],
        language: cookie.load("language") ? cookie.load("language") : "en",
        question: cookie.load({ Question })
            ? cookie.load({ Question })
            : "What language would you like the page in?",
        head: cookie.load({ Header })
            ? cookie.load({ Header })
            : "Translator",
        statement1: cookie.load({ Statement1 })
            ? cookie.load({ Statement1 })
            : "Translated Common Phrases:",
        hello: cookie.load({ Hello })
            ? cookie.load({ Hello })
            : "Hello, my name is...",
        yourname: cookie.load({ YourName })
            ? cookie.load({ YourName })
            : "What is your name?",
        wellness: cookie.load({ HowAre })
            ? cookie.load({ HowAre })
            : "How are you?",
        bathroom: cookie.load({ Bathroom })
            ? cookie.load({ Bathroom })
            : "Where is the bathroom?",
        thank: cookie.load({ Thank })
            ? cookie.load({ Thank })
            : "Thank you",
        yes: cookie.load({ Yes })
            ? cookie.load({ Yes })
            : "Yes",
        no: cookie.load({ No })
            ? cookie.load({ No })
            : "No",
        understand: cookie.load({ Understand })
            ? cookie.load({ Understand })
            : "I do not understand",
    };

    componentDidMount() {
        // load all of the language options from Google Translate to your app state

        googleTranslate.getSupportedLanguages("en", function (err, languageCodes) {
            getLanguageCodes(languageCodes); // use a callback function to setState
        });

        const getLanguageCodes = languageCodes => {
            this.setState({ languageCodes });
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
            no,
            understand,
        } = this.state;

        return (
            <div>
                <div className="head">
                    {head}
                </div>
                <div className="salut">
                    <img src={Image} alt="Hello in different languages"></img>
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
                <div>
                    <TranslateForm />
                </div>
                <div className="untranslated">
                    <ul>
                    <h2>English Common Phrases:</h2>
                        <li>Hello, my name is...</li>
                        <li>What is your name?</li>
                        <li>How are you?</li>
                        <li>Where is the bathroom?</li>
                        <li>Thank you</li>
                        <li>Yes</li>
                        <li>No</li>
                        <li>I do not understand</li>
                    </ul>
                    <ul>
                        <h2>{statement1}</h2>
                        <li>{hello}</li>
                        <li>{yourname}</li>
                        <li>{wellness}</li>
                        <li>{bathroom}</li>
                        <li>{thank}</li>
                        <li>{yes}</li>
                        <li>{no}</li>
                        <li>{understand}</li>
                    </ul>
                </div>
                <Footer />
            </div>
        );
    }

    changeHandler = language => {
        let { understand } = this.state;
        let { no } = this.state;
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
        let transHead = "";
        let transState1 = "";
        let transHello = "";
        let transName = "";
        let transWell = "";
        let transBath = "";
        let transThank = "";
        let transYes = "";
        let transNo = "";
        let transUnderstand = "";

        const thankTranslating = transThank => {
            if (thank !== transThank) {
                this.setState({ thank: transThank });
                cookie.save("thank", transThank, { path: "/" });
            }
        };
        const bathTranslating = transBath => {
            if (bathroom !== transBath) {
                this.setState({ bathroom: transBath });
                cookie.save("bathroom", transBath, { path: "/" });
            }
        };
        const wellTranslating = transWell => {
            if (wellness !== transWell) {
                this.setState({ wellness: transWell });
                cookie.save("wellness", transWell, { path: "/" });
            }
        };
        const headTranslating = transHead => {
            if (head !== transHead) {
                this.setState({ head: transHead });
                cookie.save("head", transHead, { path: "/" });
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
                this.setState({ statement1: transState1 });
                cookie.save("statement1", transState1, { path: "/" });
            }
        };
        const helloTranslating = transHello => {
            if (hello !== transHello) {
                this.setState({ hello: transHello });
                cookie.save("hello", transHello, { path: "/" });
            }
        };
        const nameTranslating = transName => {
            if (yourname !== transName) {
                this.setState({ yourname: transName });
                cookie.save("yourname", transName, { path: "/" });
            }
        };
        const yesTranslating = transYes => {
            if (yes !== transYes) {
                this.setState({ yes: transYes });
                cookie.save("yes", transYes, { path: "/" });
            }
        };
        const noTranslating = transNo => {
            if (no !== transNo) {
                this.setState({ no: transNo });
                cookie.save("yes", transYes, { path: '/' });
            }
        };
        const understandTranslating = transUnderstand => {
            if (understand !== transUnderstand) {
                this.setState({ understand: transUnderstand });
                cookie.save("understand", transUnderstand, { path: "/" });
            }
        };

        // translate the question when selecting a different language
        if (language !== cookieLanguage) {
            googleTranslate.translate(understand, language, function (err, translation) {
                transUnderstand = translation.translatedText;
                understandTranslating(transUnderstand);
            });
        }
        if (language !== cookieLanguage) {
            googleTranslate.translate(no, language, function (err, translation) {
                transNo = translation.translatedText;
                noTranslating(transNo);
            });
        }
        if (language !== cookieLanguage) {
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
        if (language !== cookieLanguage) {
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

