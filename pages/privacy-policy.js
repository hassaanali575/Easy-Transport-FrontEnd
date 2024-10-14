import React from "react";
import { useState } from "react";
import { Card, CardTitle, CardBody } from "reactstrap";
import Image from "next/image";

function PrivacyPolicy() {
    return (
        <div className="ftco-section">
            <h1 className="pageHeading text-danger">Privacy Policy</h1>
            <section className="pageBody container">
                <div className="content-wrap">
                    <div className="mt-4">
                        <p>Company has created this privacy policy in order to demonstrate its firm commitment to privacy of its customers. Your privacy is very important to us. Accordingly, we have developed this Policy in order for you to understand how we collect, use, communicate and disclose and make use of such personal information. The following outlines our privacy policy.</p>
                        <ul className="privacyPoints">
                            <li >Before or at the time of collecting personal information, we will identify the purposes for which information is being collected</li>
                            <li >We will collect and use personal information solely with the objective of fulfilling those purposes specified by us and for other compatible purposes, unless we obtain the consent of the individual concerned or as required by law</li>
                            <li >We will only retain personal information as long as necessary for the fulfilment of those purposes</li>
                            <li >We will collect personal information by lawful and fair means, where appropriate, with the knowledge or consent of the individual concerned</li>
                            <li > Personal data should be relevant to the purposes for which it is disclosed to us and to be used; to the extent necessary for those purposes, should be accurate, complete, and up-to-date at the time of such disclosure</li>
                            <li> We will protect personal information by reasonable security safeguards against loss or theft, as well as unauthorized access, disclosure, copy, use or modification as the case may be within the circumstances which are under our control</li>
                            <li >We will make readily available to customers, information about our policies and practices relating to the management of personal information</li>
                            <li > If at any point of time you would not like us to retain your personal information, kindly send us a written intimation for the same and we will remove the same from our database. In such a case of removal, if you wish to avail our services in future, you will be required to provide your information a fresh in order to provide you our services.</li>
                        </ul>
                        <p >We are committed to conduct our business in accordance with sound principles in order to ensure that the confidentiality of personal information is protected and maintained. No one except the Company and its authorised representatives/agents will have access to the personal information gathered through Company website and offices. Company is the possessor of the information gathered and does not trade, share, or rent any information obtained by the Company to any third party except for offers of the Company which are published from time to time.</p>
                        <h3 >Use of Cookies</h3>
                        <p >A cookie is a piece of data stored on the users hard drive containing information about the user. Company uses cookies for maintaining privacy policies, security, session continuity, and customization purposes. If a user rejects a cookie, he/she may still use some information put on the website of the Company, but may not be able to gain access to some of the Services or use some features of the website. Company uses client IP addresses to analyse the usage of site, administer the site, track users movements within the website of the Company, and gather broad demographic information for aggregate use. Links to other sites This site contains links to other sites. Company is not responsible for the privacy practices or the content of such web sites. This links are provided only for convenience and Company does not have any relationship with such websites. If you have any queries about privacy policy of the Company, its practices on this site, or your dealings with this web site, please contact or send an email to the following ID: support@easytransport.com</p>

                    </div>
                </div>
            </section>
        </div>
    );
}
export default PrivacyPolicy;
