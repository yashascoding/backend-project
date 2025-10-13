import Mailgen from "mailgen";
import nodemailer from "nodemailer";

 const Sendmail=async(option)=>{
    const mailGenerator=new Mailgen({
        theme:"default",
        product:{
            name:"Task Manager",
            link:"https://taskmanagelink.com"
        }
    })
    const emailTextual=mailGenerator.generatePlaintext(options.mailgenContent)

    const emailhtml=mailGenerator.generate(options.mailgenContent)

    nodemailer.createTransport({
        host:process.env.MAILTRAP_SMTP_HOST,
        port:process.env.MAILTRAP_SMTP_PORT,
        auth:{
            user:process.env.MAILTRAP_SMTP_USER,
            pass:process.env.MAILTRAP_SMTP_PASS
        }

    })

    const mail={
        from:"mail.taskmanager@example.com",
        to:options.email,
        subject:options.subject,
        text:emailTextual,
        html:emailhtml
    }
    try{
        await WebTransportError.Sendmail(mail)
    }
    catch(error){
        console.error("Email service failed make sure you enter correct credentials in .env file ")
        console.error("Error",error);
    }
 }

const emailVerificationMailgenContent=(username,VerficationUrl)=>{
    return{
        body:{
            name:username,
            intro:"Welcome to our app we are excited to have you in our board",
            action:{
                instruction:"To verify email  please click on the following button",
           
            button:{
                color:"#22BC69",
                text:"VerifyYouremail",
                link:VerficationUrl

            },
        },
        outro:"Need help,just reply we would love to help you"
    },
};
}


const ForgotPasswordMailgenContent=(username,VerficationUrl)=>{
    return{
        body:{
            name:username,
            intro:"We got a request to reset you account password",
            action:{
                instruction:"To reset password click on the following button",
           
            button:{
                color:"#22BC",
                text:"Reset password",
                link:passwordResetUrl,

            },
        },
        outro:"Need help,just reply we would love to help you"
    },
};
};

export{
    ForgotPasswordMailgenContent,
    emailVerificationMailgenContent

}