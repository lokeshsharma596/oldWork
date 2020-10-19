"use strict";
const verficationCodeFirstTime = (arg) => {
    // const base64data = Buffer.from(arg.email).toString('base64')
    return {
        from: "noreply@appypieinc.com",
        to: arg.email,
        subject: `${arg.portalName} Congratulations! Your Account has been created`,
        html: `<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
      <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body style="background: #f7f7f7;margin: 0;">
    <center>
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px; background: #fff; border-bottom: 1px solid hsla(0, 0%, 35%, 0.26); padding: 10px 20px;">
        <tr>
          <td align="left">
            <a href=${arg.url} target="_blank" style="color: #333;">${arg.portalName}</a>
          </td>
        </tr>
      </table>
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px; padding: 0px 20px; padding-top: 40px; background: #fff; padding-bottom: 20px;">
        <tr><td align="left"><p style="color: #5f5f5f; font-family:verdana; font-size: 13px; margin-bottom: 20px;">Hi ${arg.email.split('@')[0]},</p></td></tr>
        <tr>
          <td width="100%" align="left" style="font-family:verdana; font-size:16px;line-height:25px;">
            <p style="color: #5f5f5f; font-family:verdana; font-size: 13px;">You’ve successfully created your account. on ${arg.url}. Please verify your account by adding the below mentioned verification code to complete the verification process.
            </p>
            <p style="text-align: center; margin: 20px 0px;">
              <span style="border: 1px solid #333; padding: 10px 20px; font-size: 14px; color: #333; background: transparent; border-radius: 4px;">${arg.otp}</span>
            </p>
           
            <p style="color: #5f5f5f; font-family:verdana; font-size: 13px;">Note: You need to verify your account in the next 24 hours.</p>
          </td>
        </tr>
        
      </table>
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px; background: #fff; padding: 10px 20px; margin-top: 0px; border-top: 1px solid hsla(0, 0%, 35%, 0.26);">
        <tr>
          <td style="font-size:10px; text-align:center; padding: 10px 10px; color: rgba(255, 255, 255, 0.54); font-family:verdana; ">
            <p style="    font-size: 10px; color: #464646; line-height: 16px; font-family:verdana; margin-bottom: 5px;">You are receiving this email because you have signed up on ${arg.portalName}’s Desk account.</p>
          </td>
        </tr>
      </table>
    </center>
    </body>
    </html>`,
    };
};
// <p>Enter Your verification code on link given below.</p>
// <p>${arg.url}/verify/${base64data}</p>
const forgotPasswordSendVerificationCode = (arg) => {
    // const base64data = Buffer.from(arg.email).toString('base64')
    return {
        from: "noreply@appypieinc.com",
        to: arg.email,
        subject: `Verification Code for ${arg.portalName}`,
        html: `<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
      <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body style="background: #f7f7f7;margin: 0;">
    <center>
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px; background: #fff; border-bottom: 1px solid hsla(0, 0%, 35%, 0.26); padding: 10px 20px;">
        <tr>
          <td align="left">
            <a href=${arg.url} target="_blank" style="color: #333;">${arg.portalName}</a>
          </td>
        </tr>
      </table>
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px; padding: 0px 20px; padding-top: 40px; background: #fff; padding-bottom: 20px;">
        <tr><td align="left"><p style="color: #5f5f5f; font-family:verdana; font-size: 13px; margin-bottom: 20px;">Hi ${arg.email.split('@')[0]},</p></td></tr>
        <tr>
          <td width="100%" align="left" style="font-family:verdana; font-size:16px;line-height:25px;">
            <p style="color: #5f5f5f; font-family:verdana; font-size: 13px;">Please verify your account by adding the below mentioned verification code.
            </p>
            <p style="text-align: center; margin: 20px 0px;">
            <span style="border: 1px solid #333; padding: 10px 20px; font-size: 14px; color: #333; background: transparent; border-radius: 4px;">${arg.otp}</span>
            </p>
           
            <p style="color: #5f5f5f; font-family:verdana; font-size: 13px;">Note: You need to verify your account in the next 24 hours.</p>
          </td>
        </tr>
        
      </table>
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px; background: #fff; padding: 10px 20px; margin-top: 0px; border-top: 1px solid hsla(0, 0%, 35%, 0.26);">
        <tr>
          <td style="font-size:10px; text-align:center; padding: 10px 10px; color: rgba(255, 255, 255, 0.54); font-family:verdana; ">
            <p style="    font-size: 10px; color: #464646; line-height: 16px; font-family:verdana; margin-bottom: 5px;">You are receiving this email because you have signed up on ${arg.portalName}’s Desk account.</p>
          </td>
        </tr>
      </table>
    </center>
    </body>
    </html>`,
    };
};
// <p>Enter Your verification code on link given below.</p>
// <p>${arg.url}/verify/${base64data}</p>
const accountCreatedSuccess = (arg) => {
    return {
        from: 'noreply@appypieinc.com',
        to: arg.email,
        subject: `${arg.portalName} Congratulations! Your Account has been created successfully`,
        html: `<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
	<meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body style="background: #f7f7f7;margin: 0;">
<center>
	<table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px; background: #fff; border-bottom: 1px solid hsla(0, 0%, 35%, 0.26); padding: 10px 20px;">
		<tr>
			<td align="left">
				<a href=${arg.url} target="_blank" style="color: #333;">` + arg.portalName + `</a>
			</td>
		</tr>
	</table>
	<table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px; padding: 0px 20px; padding-top: 40px; background: #fff; padding-bottom: 20px;">
		<tr><td align="left"><p style="color: #5f5f5f; font-family:verdana; font-size: 13px; margin-bottom: 20px;">Hi ` + arg.email.split('@')[0] + `,</p></td></tr>
		<tr>
			<td width="100%" align="left" style="font-family:verdana; font-size:16px;line-height:25px;">
				<p style="color: #5f5f5f; font-family:verdana; font-size: 13px;">Thanks for verifying your account.</p>
				
				<p style="color: #5f5f5f; font-family:verdana; font-size: 13px;">Feel free to login anytime to check the status of your tickets and raise new queries or concerns which you may have.</p>
			</td>
		</tr>
		
	</table>
	<table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px; background: #fff; padding: 10px 20px; margin-top: 0px; border-top: 1px solid hsla(0, 0%, 35%, 0.26);">
		<tr>
			<td style="font-size:10px; text-align:center; padding: 10px 10px; color: rgba(255, 255, 255, 0.54); font-family:verdana; ">
				<p style="    font-size: 10px; color: #464646; line-height: 16px; font-family:verdana; margin-bottom: 5px;">You are receiving this email because you have signed up on ` + arg.portalName + `’s Desk account.</p>
			</td>
		</tr>
	</table>
</center>
</body>
</html>`
    };
};
const emailAfterComment = (arg) => {
    const name = (arg.firstname !== undefined && arg.firstname.length > 0 && arg.lastname !== undefined && arg.lastname.length > 0) ? arg.firstname[0].toUpperCase() + arg.firstname.slice(1) + " " + arg.lastname[0].toUpperCase() + arg.lastname.slice(1) : (arg.firstname !== undefined && arg.firstname.length > 0) ? arg.firstname[0].toUpperCase() + arg.firstname.slice(1) : arg.email.split('@')[0][0].toUpperCase() + arg.email.split('@')[0].slice(1);
    return {
        from: "noreply@appypieinc.com",
        to: arg.email,
        subject: "Received Comment on Your Article",
        html: `<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
      <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>appypie.com</title>
    </head>
    <body style="background: #f7f7f7;margin: 0;">
    <center>
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px; background: #fff; padding: 10px 20px;">
        <tr>
          <td align="left">
           <a href="http://snappy.appypie.com" target="_blank"><img src="https://firebasestorage.googleapis.com/v0/b/knowledgebase-data/o/Group%205303.png?alt=media&token=93d63f28-6cc8-4b4e-9118-3600f799c400" style="max-width: 220px; position: relative;
                     top: 0px;" alt="appypie.com"></a>
          </td>
        </tr>
      </table>
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px; padding: 0px 20px; padding-top: 0px; background: #fff; padding-bottom: 20px;">
        <tr>
          <td align="center">
            <img src="https://firebasestorage.googleapis.com/v0/b/knowledgebase-data/o/message.png?alt=media&token=b6277ac4-4b2f-4ec0-b84c-84b8931a5544" alt="" style="width: 250px; margin-bottom: 20px; margin-top: 0px;" >
          </td>
        </tr>
        <tr><td align="left"><h4 style="font-family:'Roboto', sans-serif; ">Hi ${name},</h4></td></tr>
        <tr>
          <td width="100%" align="left" style="font-family:'Roboto', sans-serif; font-size:16px;line-height:25px;">
            <p style="color: #333; font-family:'Roboto', sans-serif; font-size: 13px;margin-bottom: 30px;">It seems customers are enjoying your Knowledge base and have left comments on the article</p>            
          </td>
        </tr>
    
        <tr>
          <td align="center" height="100" style="background: #f5f5f5; padding: 20px 20px">
            <h4 style="font-size: 20px; color: #333; font-family:'Roboto', sans-serif;margin-bottom: 0px; margin-top: 0px; "> How to enjoy and learn at same time!!!</h4>
            <a href=${arg.article_url}><button style="background: #c73500; color: #fff; font-size: 14px; padding: 10px 20px; border: 0; border-radius: 100px; margin-top: 20px; margin-bottom: 10px;">View Comments</button></a>
          </td>
        </tr>
    
        
    
        <tr>
          <td align="center" >
            <p style="color: #333; font-family:'Roboto', sans-serif; font-size: 13px; text-align: center; margin-bottom: 5px;     margin-top: 30px;">In case the above link is broken, copy and paste the URL in the browser.</p>
            <p style="color: #333; font-family:'Roboto', sans-serif; font-size: 13px; text-align: center; margin: 0;"><a href=${arg.article_url} style="color:#2196F3; text-decoration: none;font-family: 'Roboto', sans-serif;font-size: 13px;">${arg.article_url}</a></p>
          </td>
        </tr>
        
      </table>
      <table border="0" cellpadding="1" cellspacing="10" width="100%" style="max-width:600px; padding: 0px 20px; padding-top: 0px; background: #fff; padding-bottom: 0px;">
        <tr>
          <td width="250" height="100" style="background: #f5f5f5;">
            <p style="color: #333; font-family:'Roboto', sans-serif; font-size: 12px;padding: 0px 20px; display: inline-block; margin-bottom: 0px; margin-top: 0px;    line-height: 20px;">In case you need help with getting started, you can also view <a href="https://www.appypiedesk.com/Appy-Pie-Knowledge" style="color: #2196F3;">AppyPie Knowledge Help</a></p>
          </td>
          <td width="250" height="100" style="background: #f5f5f5;">
            <p style="color: #333; font-family:'Roboto', sans-serif; font-size: 12px;padding: 0px 20px; display: inline-block; margin-bottom: 0px; margin-top: 0px;    line-height: 20px;">For feedback or any queries, please email us at <a href="mailto:support@appypiedesk.com -" style="color: #2196F3;">support@appypiedesk.com</a></p>
          </td>
        </tr>
      </table>
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px; background: #fff; padding: 10px 20px; margin-top: 0px; ">
        <tr>
          <td>
            <p style="border-top: 1px dashed #dedede; color: #5f5f5f; font-family:'Roboto', sans-serif; font-size: 13px; margin-bottom: 0px; height: 10px;">&nbsp;</p>
          </td>
        </tr>
        <tr>
          <td width="100%" align="left" style="font-family:'Roboto', sans-serif; font-size:16px;line-height:25px;">
            <p style="font-size: 13px; color: #333; font-family:'Roboto', sans-serif;margin-bottom: 0px; margin-top: 0px; ">Regards,</p>
            <p style="overflow: hidden; margin-top: 0px; margin-bottom: 30px;">
            
              <span style="font-size: 13px; color: #969696; font-family:'Roboto', sans-serif; display: block;"><b style="font-size: 16px; color: #333;">Team AppyPie</b></span>
              </span>
            </p>
          </td>
        </tr>
        <tr>
          <td style="font-size:10px; text-align:center; padding: 10px 10px; color: rgba(255, 255, 255, 0.54); font-family:'Roboto', sans-serif; ">
            <span style="display:block;">
            <a href="https://www.appypie.com/privacy-policy" style="color:#2196F3">Privacy Policy</a>
            <span style="color: #a7a7a7; padding: 0px 5px;">/</span>
            <a href="https://www.appypie.com/terms-of-use" style="color:#2196F3">Terms & Conditions </a> 
            </span>
          </td>
        </tr>
      </table>
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px; background: #fff; padding: 10px 20px; margin-top: 0px; background: #f0f0f0 ">
        <tr>
          <td style="font-size:10px; text-align:center; padding: 6px 0px; color: rgba(255, 255, 255, 0.54); font-family:'Roboto', sans-serif; ">
            <p style="font-size: 10px; color: #a6a6a6; line-height: 16px; font-family:'Roboto', sans-serif; margin-bottom: 0px; margin-top: 0px;">You are receiving this email because you have register for an account on Appy Pie Knowledge.</p>
          </td>
        </tr>
      </table>
    </center>
    </body>
    </html>`,
    };
};
module.exports = {
    verficationCodeFirstTime: verficationCodeFirstTime,
    accountCreatedSuccess: accountCreatedSuccess,
    emailAfterComment: emailAfterComment,
    forgotPasswordSendVerificationCode: forgotPasswordSendVerificationCode
};
// const verficationCode = (arg: any) => {
//   const email: any = arg.email.split('@')
//   const hideEmail: any = email[0][0] + email[0][1] + "*".repeat(email[0].length - 2)
//   return {
//     from: "noreply@appypieinc.com",
//     to: arg.email,
//     subject: "Verification Code For Email",
//     html: `<div style="background:#f7f7f7;margin:0"><div class="adM">
//               </div><center>
//                 <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;background:#fff;padding:10px 20px">
//                   <tbody><tr>
//                     <td align="left">
//                      <a href="http://snappy.appypie.com" target="_blank" data-saferedirecturl="https://www.google.com/url?q=http://snappy.appypie.com&amp;source=gmail&amp;ust=1585694733433000&amp;usg=AFQjCNF0q0OUXgddb16e-RTTJDYeD5EN_g"><img src="https://ci3.googleusercontent.com/proxy/853AHaqVnLUxNoM5EvuZgU5PjVeW2QwXCf1umhp0Gxskxn-N-W-Gd61I33vNS63YLbtiunGLyiqKLROFwLCSWuQ7Cw1N_vjR2QprjaRBy0Gm7VvXjLoYGpyBTz0UeEEodDgixCUbdYLG0XT0gR2QcntL1P6cMvPt40etBXJIrORry5BgQmawmKGQzWP8mWcZFWbsyvg-pQu83g=s0-d-e1-ft#https://firebasestorage.googleapis.com/v0/b/knowledgebase-data/o/Group%205303.png?alt=media&amp;token=93d63f28-6cc8-4b4e-9118-3600f799c400" style="max-width:220px" alt="appypie.com" class="CToWUd"></a>
//                     </td>
//                   </tr>
//                 </tbody></table>
//                 <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;padding:0px 20px;padding-top:0px;background:#fff;padding-bottom:20px">
//                   <tbody><tr>
//                     <td align="center">
//                       <img src="https://ci5.googleusercontent.com/proxy/44jgPjg_tjaBYh9mj7ChaGHbs_aD6DnhrMdnM8s28DgCeoxevA0WppYJPJMAMxZkJZ979N-r04K51kgcrM0dHWA05kHhmV1V1ExTq95eoldieOFr0nywvsIfHcBzqaoTr3ycrRW36O6_RrVFq6ntmSYxdRlK1RrVkJhRafSNvfocdkl5pS_1IjHBJ89EoDkBzl2yelawSkwvWA=s0-d-e1-ft#https://firebasestorage.googleapis.com/v0/b/knowledgebase-data/o/verfication.png?alt=media&amp;token=5d24c098-fc37-454e-a6d3-199af48f515cg" alt="" style="width:300px;margin-bottom:20px" class="CToWUd a6T" tabindex="0"><div class="a6S" dir="ltr" style="opacity: 0.01; left: 317.5px; top: 202px;"><div id=":oi" class="T-I J-J5-Ji aQv T-I-ax7 L3 a5q" title="Download" role="button" tabindex="0" aria-label="Download attachment " data-tooltip-class="a1V"><div class="aSK J-J5-Ji aYr"></div></div></div>
//                     </td>
//                   </tr>
//                   <tr><td align="left"><h4 style="font-family:verdana">Hi ${email[0]},</h4></td></tr>
//                   <tr>
//                     <td width="100%" align="left" style="font-family:verdana;font-size:16px;line-height:25px">
//                       <p style="color:#333;font-family:verdana;font-size:13px">Thank you for choosing Appy Pie Knowledge Base for creating your own self service knowledge base. </p>
//                       <p style="color:#333;font-family:verdana;font-size:13px">Your verification code for email <strong>${hideEmail}<a href="http://gmail.com" target="_blank" data-saferedirecturl="https://www.google.com/url?q=http://gmail.com&amp;source=gmail&amp;ust=1585694733434000&amp;usg=AFQjCNHCHHfEUNzQ5u_342jUudm5bF4Okw">@${email[1]}</a></strong> is.</p>
//                       <h3 style="font-family:verdana">${arg.otp}</h3> 
//                       <p style="color:#333;font-family:verdana;font-size:13px">Please write this code in the verfication screen to complete the verfication process.</p>
//                       <p style="color:#333;font-family:verdana;font-size:13px">if you face a problem while verfication your account, please email us at <a href="mailto:support@appypie.com" style="color:#2196f3" target="_blank">support@appypie.com</a></p>
//                               <p style="border-top:1px dashed #dedede;color:#5f5f5f;font-family:verdana;font-size:13px;margin-bottom:0px;height:10px">&nbsp;</p>
//               <p style="font-size:13px;color:#333;font-family:verdana;margin-bottom:0px;margin-top:0px">Regards,</p>
//               <p style="overflow:hidden;margin-top:0px">
//                      <span style="font-size:13px;color:#969696;font-family:verdana;display:block"><b style="font-size:16px;color:#333">Team AppyPie</b></span>
//               </p></td>
//                   </tr>
//                 </tbody></table>
//                   <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;background:#fff;padding:10px 20px;margin-top:0px">
//                   <tbody><tr>
//                     <td style="font-size:10px;text-align:center;padding:10px 10px;color:rgba(255,255,255,0.54);font-family:verdana">
//                       <span style="display:block"><a href="#m_760076906725865178_" style="color:#2196f3">Privacy Policy</a><span style="color:#a7a7a7;padding:0px 5px">/</span><a href="#m_760076906725865178_" style="color:#2196f3">Terms &amp; Conditions </a> <span style="color:#a7a7a7;padding:0px 5px">/</span><a href="#m_760076906725865178_" style="color:#2196f3">Unsubscribe</a></span>
//                     </td>
//                   </tr>
//                 </tbody></table>
//                 <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;background:#fff;padding:10px 20px;margin-top:0px;background:#f0f0f0">
//                   <tbody><tr>
//                     <td style="font-size:10px;text-align:center;padding:6px 0px;color:rgba(255,255,255,0.54);font-family:verdana">
//                       <p style="font-size:10px;color:#a6a6a6;line-height:16px;font-family:verdana;margin-bottom:0px;margin-top:0px">You are receiving this email because you have register for an account on Appy Pie Knowledge Base.</p>
//                     </td>
//                   </tr>
//                 </tbody></table>
//               </center>
//               </div>
//               `,
//   };
// }
// const accountCreatedSuccess = (arg: any) => {
//   return {
//     from: 'noreply@appypieinc.com',
//     to: arg.email,
//     subject: 'Account created sucessfully',
//     html: `<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
//         <head>
//           <meta charset="UTF-8">
//             <meta http-equiv="X-UA-Compatible" content="IE=edge">
//             <meta name="viewport" content="width=device-width, initial-scale=1">
//           <title>appypie.com</title>
//         </head>
//         <body style="background: #f7f7f7;margin: 0;">
//         <center>
//           <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px; background: #fff; padding: 10px 20px;">
//             <tr>
//               <td align="left">
//                <a href="http://snappy.appypie.com" target="_blank"><img src="https://firebasestorage.googleapis.com/v0/b/knowledgebase-data/o/Group%205303.png?alt=media&token=93d63f28-6cc8-4b4e-9118-3600f799c400" style="max-width: 220px; position: relative;
//                          top: 0px;" alt="appypie.com"></a>
//               </td>
//             </tr>
//           </table>
//           <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px; padding: 0px 20px; padding-top: 0px; background: #fff; padding-bottom: 20px;">
//             <tr>
//               <td align="center">
//                 <img src="https://firebasestorage.googleapis.com/v0/b/knowledgebase-data/o/ver-succes.png?alt=media&token=7865d287-dc95-4b6c-b961-b8e8d384dfd0" alt="" style="width: 300px; margin-bottom: 20px" >
//               </td>
//             </tr>
//             <tr><td align="left"><h4 style="font-family:verdana; ">Hi ` + arg.email.split('@')[0] + `,</h4></td></tr>
//             <tr>
//               <td width="100%" align="left" style="font-family:verdana; font-size:16px;line-height:25px;">
//                 <h2 style="color: #333; font-family:verdana;font-size: 22px;margin-bottom: 0px;">Your email has been verified successfully. </h2>
//                 <p style="color: #939393; font-family:verdana; font-size: 13px;margin-top: 4px;">For feedback or any queries, please email us at <a href="mailto:support@appypie.com" style="color: #2196F3;">support@appypie.com</a></p>
//                 <p style="border-top: 1px dashed #dedede; color: #5f5f5f; font-family:verdana; font-size: 13px; margin-bottom: 0px; margin-top: 20px; height: 10px;">&nbsp;</p>
//         <p style="font-size: 13px; color: #333; font-family:verdana;margin-bottom: 0px; margin-top: 0px; ">Regards,</p>
//         <p style="overflow: hidden; margin-top: 0px;"><span style="font-size: 13px; color: #969696; font-family:verdana; display: block;"><b style="font-size: 16px; color: #333;">Team AppyPie</b></span>
//             </span>
//         </p></td>
//             </tr>
//           </table>
//             <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px; background: #fff; padding: 10px 20px; margin-top: 0px; ">
//             <tr>
//               <td style="font-size:10px; text-align:center; padding: 10px 10px; color: rgba(255, 255, 255, 0.54); font-family:verdana; ">
//                 <span style="display:block;"><a href="#" style="color:#2196F3">Privacy Policy</a><span style="color: #a7a7a7; padding: 0px 5px;">/</span><a href="#" style="color:#2196F3">Terms & Conditions </a> <span style="color: #a7a7a7; padding: 0px 5px;">/</span><a href="#" style="color:#2196F3">Unsubscribe</a></span>
//               </td>
//             </tr>
//           </table>
//           <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px; background: #fff; padding: 10px 20px; margin-top: 0px; background: #f0f0f0 ">
//             <tr>
//               <td style="font-size:10px; text-align:center; padding: 6px 0px; color: rgba(255, 255, 255, 0.54); font-family:verdana; ">
//                 <p style="font-size: 10px; color: #a6a6a6; line-height: 16px; font-family:verdana; margin-bottom: 0px; margin-top: 0px;">You are receiving this email because you have register for an account on Appy Pie Knowledge Base.</p>
//               </td>
//             </tr>
//           </table>
//         </center>
//         </body>
//         </html>`
//   }
// }
// const resetSuccess = (arg: any) => {
//   return {
//     from: 'noreply@appypieinc.com',
//     to: arg.email,
//     subject: 'Acoount reset',
//     html: `<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
//         <head>
//           <meta charset="UTF-8">
//             <meta http-equiv="X-UA-Compatible" content="IE=edge">
//             <meta name="viewport" content="width=device-width, initial-scale=1">
//           <title>appypie.com</title>
//         </head>
//         <body style="background: #f7f7f7;margin: 0;">
//         <center>
//           <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px; background: #fff; padding: 10px 20px;">
//             <tr>
//               <td align="left">
//                <a href="http://snappy.appypie.com" target="_blank"><img src="https://firebasestorage.googleapis.com/v0/b/knowledgebase-data/o/Group%205303.png?alt=media&token=93d63f28-6cc8-4b4e-9118-3600f799c400" style="max-width: 220px; position: relative;
//                          top: 0px;" alt="appypie.com"></a>
//               </td>
//             </tr>
//           </table>
//           <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px; padding: 0px 20px; padding-top: 0px; background: #fff; padding-bottom: 20px;">
//             <tr>
//               <td align="center">
//                 <img src="https://firebasestorage.googleapis.com/v0/b/knowledgebase-data/o/verificaton-2.png?alt=media&token=a63cdf0e-769d-4903-b783-d38dba8db4a9" alt="" style="width: 300px; margin-bottom: 20px" >
//               </td>
//             </tr>
//             <tr><td align="left"><h4 style="font-family:verdana; ">Hi ` + arg.email.split('@')[0] + `,</h4></td></tr>
//             <tr>
//               <td width="100%" align="left" style="font-family:verdana; font-size:16px;line-height:25px;">
//                 <h2 style="color: #333; font-family:verdana;font-size: 22px;margin-bottom: 0px;">Your email has been verified successfully. </h2>
//                 <p style="color: #939393; font-family:verdana; font-size: 13px;margin-top: 4px;">For feedback or any queries, please email us at <a href="mailto:support@appypie.com" style="color: #2196F3;">support@appypie.com</a></p>
//                        <p style="border-top: 1px dashed #dedede; color: #5f5f5f; font-family:verdana; font-size: 13px; margin-bottom: 0px; margin-top: 20px; height: 10px;">&nbsp;</p>
//         <p style="font-size: 13px; color: #333; font-family:verdana;margin-bottom: 0px; margin-top: 0px; ">Regards,</p>
//         <p style="overflow: hidden; margin-top: 0px;">
//             <span style="font-size: 13px; color: #969696; font-family:verdana; display: block;"><b style="font-size: 16px; color: #333;">Team AppyPie</b></span>
//             </span>
//         </p>
//               </td>
//             </tr>
//           </table>
//             <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px; background: #fff; padding: 10px 20px; margin-top: 0px; ">
//             <tr>
//               <td style="font-size:10px; text-align:center; padding: 10px 10px; color: rgba(255, 255, 255, 0.54); font-family:verdana; ">
//                 <span style="display:block;"><a href="#" style="color:#2196F3">Privacy Policy</a><span style="color: #a7a7a7; padding: 0px 5px;">/</span><a href="#" style="color:#2196F3">Terms & Conditions </a> <span style="color: #a7a7a7; padding: 0px 5px;">/</span><a href="#" style="color:#2196F3">Unsubscribe</a></span>
//               </td>
//             </tr>
//           </table>
//           <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px; background: #fff; padding: 10px 20px; margin-top: 0px; background: #f0f0f0 ">
//             <tr>
//               <td style="font-size:10px; text-align:center; padding: 6px 0px; color: rgba(255, 255, 255, 0.54); font-family:verdana; ">
//                 <p style="font-size: 10px; color: #a6a6a6; line-height: 16px; font-family:verdana; margin-bottom: 0px; margin-top: 0px;">You are receiving this email because you have register for an account on Appy Pie Knowledge Base.</p>
//               </td>
//             </tr>
//           </table>
//         </center>
//         </body>
//         </html>
//         `
//   };
// }
// const welcomeEmail = (arg: any) => {
//   return {
//     from: 'noreply@appypieinc.com',
//     to: arg.email,
//     subject: 'Welcome to account',
//     html: `<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
//     <head>
//       <meta charset="UTF-8">
//         <meta http-equiv="X-UA-Compatible" content="IE=edge">
//         <meta name="viewport" content="width=device-width, initial-scale=1">
//       <title>appypie.com</title>
//     </head>
//     <body style="background: #f7f7f7;margin: 0;">
//     <center>
//       <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px; background: #fff; padding: 10px 20px;">
//         <tr>
//           <td align="left">
//            <a href="http://snappy.appypie.com" target="_blank"><img src="https://firebasestorage.googleapis.com/v0/b/knowledgebase-data/o/Group%205303.png?alt=media&token=93d63f28-6cc8-4b4e-9118-3600f799c400" style="max-width: 220px; position: relative;
//                      top: 0px;" alt="appypie.com"></a>
//           </td>
//         </tr>
//       </table>
//       <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px; padding: 0px 20px; padding-top: 0px; background: #fff; padding-bottom: 20px;">
//         <tr>
//           <td align="center">
//             <img src="https://firebasestorage.googleapis.com/v0/b/knowledgebase-data/o/congratulation.png?alt=media&token=f4effd71-5157-4869-ae52-2d5fb8d86ff5" alt="" style="width: 100%; margin-bottom: 20px; margin-top: -60px;" >
//           </td>
//         </tr>
//         <tr><td align="left"><h4 style="font-family:verdana; ">Hi ` + arg.email.split('@')[0] + `,</h4></td></tr>
//         <tr>
//           <td width="100%" align="left" style="font-family:verdana; font-size:16px;line-height:25px;">
//             <p style="color: #333; font-family:verdana; font-size: 13px;">Congratulation and Welcome to Appy Pie <strong>Knowledge Base</strong> - a one-stop, no-code platform where you can create an <strong>intelling</strong> self service <strong>Knowledge Base</strong> for your customers.</p>
//           </td>
//         </tr>
//         <tr>
//           <td align="center">
//             <img src="https://firebasestorage.googleapis.com/v0/b/knowledgebase-data/o/getstarted-kb.png?alt=media&token=951246db-f4ee-4f0b-9aba-7bebcff6436b" style="width: 60%; margin:10px 0px;" >
//           </td>
//         </tr>
//         <tr>
//           <td align="center" >
//             <h3 style="font-family:verdana; margin-top: 20px;">Start adding articles to your Knowledge Base</h3>
//             <a style="background: #c73500; color: #fff; font-size: 14px; padding: 10px 20px; border: 0; border-radius: 100px;" href="` + `appypiedesk` + `.com">Get Started</a>
//           </td>
//         </tr>
//       </table>
//       <table border="0" cellpadding="1" cellspacing="10" width="100%" style="max-width:600px; padding: 0px 20px; padding-top: 0px; background: #fff; padding-bottom: 0px;">
//         <tr>
//           <td width="250" height="100" style="background: #f5f5f5;">
//             <p style="color: #333; font-family:verdana; font-size: 13px;padding: 0px 20px; display: inline-block; margin-bottom: 0px; margin-top: 0px;    line-height: 20px;">In case you need help with getting started, you can also view <a href="" style="color: #2196F3;">AppyPie Knowledge Base Help</a></p>
//           </td>
//           <td width="250" height="100" style="background: #f5f5f5;">
//             <p style="color: #333; font-family:verdana; font-size: 13px;padding: 0px 20px; display: inline-block; margin-bottom: 0px; margin-top: 0px;    line-height: 20px;">For feedback or any queries, please email us at<a href="mailto:support@appypie.com" style="color: #2196F3;">support@appypie.com</a></p>
//           </td>
//         </tr>
//       </table>
//       <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px; background: #fff; padding: 10px 20px; margin-top: 0px; ">
//         <tr>
//           <td>
//             <p style="border-top: 1px dashed #dedede; color: #5f5f5f; font-family:verdana; font-size: 13px; margin-bottom: 0px; height: 10px;">&nbsp;</p>
//           </td>
//         </tr>
//         <tr>
//           <td width="100%" align="left" style="font-family:verdana; font-size:16px;line-height:25px;">
//             <p style="font-size: 13px; color: #333; font-family:verdana;margin-bottom: 0px; margin-top: 0px; ">Regards,</p>
//             <p style="overflow: hidden; margin-top: 0px; margin-bottom: 30px;">
//             <span style="font-size: 13px; color: #969696; font-family:verdana; display: block;"><b style="font-size: 16px; color: #333;">Team AppyPie</b></span>
//               </span>
//             </p>
//           </td>
//         </tr>
//         <tr>
//           <td style="font-size:10px; text-align:center; padding: 10px 10px; color: rgba(255, 255, 255, 0.54); font-family:verdana; ">
//             <span style="display:block;"><a href="#" style="color:#2196F3">Privacy Policy</a><span style="color: #a7a7a7; padding: 0px 5px;">/</span><a href="#" style="color:#2196F3">Terms & Conditions </a> <span style="color: #a7a7a7; padding: 0px 5px;">/</span><a href="#" style="color:#2196F3">Unsubscribe</a></span>
//           </td>
//         </tr>
//       </table>
//       <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px; background: #fff; padding: 10px 20px; margin-top: 0px; background: #f0f0f0 ">
//         <tr>
//           <td style="font-size:10px; text-align:center; padding: 6px 0px; color: rgba(255, 255, 255, 0.54); font-family:verdana; ">
//             <p style="font-size: 10px; color: #a6a6a6; line-height: 16px; font-family:verdana; margin-bottom: 0px; margin-top: 0px;">You are receiving this email because you have register for an account on Appy Pie Knowledge Base.</p>
//           </td>
//         </tr>
//       </table>
//     </center>
//     </body>
//     </html> 
//     `}
// }
//# sourceMappingURL=emailTemplates.js.map