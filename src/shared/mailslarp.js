// import axios from '../axios-orders';
import { MailSlurp } from "mailslurp-client";
import axios from 'axios';
const mailslurp = new MailSlurp({ apiKey: "570e299044c2866af753d80c775df0146a29b080036bc23d3c8839f97ee472e7" });

// const axios = require("axios");

const API_KEY = "570e299044c2866af753d80c775df0146a29b080036bc23d3c8839f97ee472e7";
const inbox = mailslurp.createInbox();
const options = {
    to: ["test@myemail.com"],
    subject: "Hello",
    body: "Welcome",
};


export async function sentMail() {
    await mailslurp.sendEmail(inbox.id, options);
    //call MailSlurp createInbox endpoint
    let data = {
        senderId: "tst",
        to: "shkliarskiyigor@gmail.com",
        subject: "Hello inbox 2",
        body: "Test from inbox 1",
    }
    return await axios
        .post(`https://api.mailslurp.com/createInbox?apiKey=${API_KEY}`, data)
        .then((res) => { res.data; console.log("res test ", res) });
}


export const sentMail2 = (inbox1, inbox2) => {

    console.log("work!!")
    axios({
        method: "POST",
        url: `https://api.mailslurp.com/sendEmail?apiKey=${API_KEY}`,
        data: {
            senderId: 2222,
            to: ['shkliarskiyigor@gmail.com'],
            subject: "Hello inbox 2",
            body: "Test from inbox 1",
        },
    });
    // axios({
    //     method: "POST",
    //     url: `https://api.mailslurp.com/sendEmail?apiKey=${API_KEY}`,
    //     data: {
    //         senderId: "tst",
    //         to: "shkliarskiyigor@gmail.com",
    //         subject: "Hello inbox 2",
    //         body: "Test from inbox 1",
    //     },
    // })
    // let data = {
    //     senderId: "tst",
    //     to: "shkliarskiyigor@gmail.com",
    //     subject: "Hello inbox 2",
    //     body: "Test from inbox 1",
    // }

}
