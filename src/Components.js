import React from 'react';

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

class YourName extends  React.Component {
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
            <div>
                <footer>Veronica Kemp</footer>
            </div>
        );
    }
}

export default {
    Footer,
    Question,
    Understand,
    No,
    Yes,
    Thank,
    Header,
    Bathroom,
    HowAre,
    YourName,
    Hello,
    Statement1,
}