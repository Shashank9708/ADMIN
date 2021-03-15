import React from 'react';
import { Alert } from 'react-bootstrap';


/**
 * PrivacyPolicy
 *
 * @package                ARKAdmin
 * @subpackage             PrivacyPolicy
 * @category               Presentational Component
 * @DateOfCreation         12 March 2019
 * @ShortDescription       This component is reponsible to show the Forgot password form
 */
export const PrivacyPolicy = (props) => {
    return (
 <div className="main-container">
            <div className="col-md-12">
                <div className="privacy">
					
                    <div className="text-center bottom-pad">
                        <img src="src\assets\images\Trick-Icon.png"/>
                    </div>
					<h4 className="user-privacy">USER PRIVACY STATEMENT</h4>
					<div className="text-left">
						<p>247 Bahamas collects information about you when you use our mobile applications, websites, and other online products and services (collectively, the “Services”) and through other interactions and communications you have with us. If you reside in the United States, the Services are provided by 247 Bahamas and its affiliates (collectively “247 Bahamas”), and this Privacy Statement applies to information collected and used by 247 Bahamas (247 Bahamas are referred to herein collectively as “247 Bahamas” or “we”).</p>
					</div>
					<h4 className="user-privacy">Scope and Application</h4>
					<div className="text-left">
						<p>This Privacy Statement (“Statement") applies to persons anywhere in the world who use our apps or Services to request transportation, delivery, or other on-demand services (“Users”). This Statement does not apply to information we collect from or about drivers, couriers, partner transportation companies, or any other persons who use the 247 Bahamas platform under license (collectively “Drivers”). If you interact with the Services as both a User and a Driver, the respective privacy statements apply to your different interactions.</p>
					</div>
					
					<h4 className="user-privacy">Collection of Information</h4>
					
					<div className="text-left">
						<p>We collect information you provide directly to us, such as when you create or modify your account, request on-demand services, contact customer support, or otherwise communicate with us. This information may include: name, email, phone number, postal address, profile picture, payment method, items requested (for delivery services), delivery notes, and other information you choose to provide.</p>
					</div>
					
					<h4 className="user-privacy">When you use our Services, we collect information about you in the following general categories:</h4>
					
					<h6 className="privacy-other-information">Location Information:</h6>
					<div className="text-left">
						<p>When you use the Services for transportation or delivery, we collect precise location data about the trip from the 247 Bahamas app used by the Driver. If you permit the 247 Bahamas app to access location services through the permission system used by your mobile operating system (“platform”), we may also collect the precise location of your device when the app is running in the foreground or background. We may also derive your approximate location from your IP address.</p>
					</div>
					
					<h6 className="privacy-other-information">Contacts Information:</h6>
					<div className="text-left">
						<p>If you permit the 247 Bahamas app to access the address book on your device through the permission system used by your mobile platform, we may access and store names and contact information from your address book to facilitate social interactions through our Services and for other purposes described in this Statement or at the time of consent or collection.</p>
					</div>
					
					<h6 className="privacy-other-information">Transaction Information:</h6>
					<div className="text-left">
						<p>We collect transaction details related to your use of our Services, including the type of service requested, date and time the service was provided, amount charged, distance traveled, and other related transaction details. Additionally, if someone uses your promo code, we may associate your name with that person.</p>
					</div>

					<h6 className="privacy-other-information">Usage and Preference Information: </h6>
					<div className="text-left">
						<p>We collect information about how you and site visitors interact with our Services, preferences expressed, and settings chosen. In some cases, we do this through the use of cookies, pixel tags, and similar technologies that create and maintain unique identifiers. To learn more about these technologies, please see our Cookie Statement.</p>
					</div>
					
					<h6 className="privacy-other-information">Device Information: </h6>
					<div className="text-left">
						<p>We may collect information about your mobile device, including, for example, the hardware model, operating system and version, software and file names and versions, preferred language, unique device identifier, advertising identifiers, serial number, device motion information, and mobile network information.</p>
					</div>	

					<h6 className="privacy-other-information">Call and SMS Data : </h6>
					<div className="text-left">
						<p>Our Services facilitate communications between Users and Drivers. In connection with facilitating this service, we receive call data, including the date and time of the call or SMS message, the parties’ phone numbers, and the content of the SMS message.</p>
					</div>	

					<h6 className="privacy-other-information">Log Information: </h6>
					<div className="text-left">
						<p>When you interact with the Services, we collect server logs, which may include information like device IP address, access dates and times, app features or pages viewed, app crashes and other system activity, type of browser, and the third-party site or service you were using before interacting with our Services.</p>
					</div>		

					<h4 className="user-privacy">Important Information About Platform Permissions</h4>	

					<div className="text-left">
						<p>Most mobile platforms (iOS, Android, etc.) have defined certain types of device data that apps cannot access without your consent. And these platforms have different permission systems for obtaining your consent. The iOS platform will alert you the first time the 247 Bahamas app wants permission to access certain types of data and will let you consent (or not consent) to that request. Android devices will notify you of the permissions that the 247 Bahamas app seeks before you first use the app, and your use of the app constitutes your consent. To learn about the platform-level permissions that the app seeks, please visit our new iOS Permissions page and Android Permissions page. Sometimes these permissions require more explanation than the platforms themselves provide, and the permissions we request will change over time, so we’ve created these pages to serve as authoritative and up-to-date resources for our users.</p>
					</div>	

					<h4 className="user-privacy">We may also receive information from other sources and combine that with information we collect through our Services. For example:</h4>	

					<div className="text-left">
						<p>If you choose to link, create, or log in to your 247 Bahamas account with a payment provider (e.g., Google Wallet) or social media service (e.g., Facebook), or if you engage with a separate app or website that uses our API (or whose API we use), we may receive information about you or your connections from that site or app.</p>
					</div>	
					
					<div className="text-left">
						<p>If your employer uses one of our enterprise solutions, such as 247 Bahamas for Business, we may receive information about you from your employer.</p>
					</div>	
					
					<div className="text-left">
						<p> When you request on demand services, our Drivers may provide us with a User rating after providing services to you.</p>
					</div>	

					<div className="text-left">
						<p> If you also interact with our Services in another capacity, for instance as a Driver or user of other apps we provide, we may combine or associate that information with information we have collected from you in your capacity as a User or rider.</p>
					</div>						

					<h4 className="user-privacy">We may use the information we collect about you to:</h4>	

					
					<div className="text-left">
						<p> Provide, maintain, and improve our Services, including, for example, to facilitate payments, send receipts, provide products and services you request (and send related information), develop new features, provide customer support to Users and Drivers, develop safety features, authenticate users, and send product updates and administrative messages;</p>
					</div>
					
					<div className="text-left">
						<p> Perform internal operations, including, for example, to prevent fraud and abuse of our Services; to troubleshoot software bugs and operational problems; to conduct data analysis, testing, and research; and to monitor and analyze usage and activity trends;</p>
					</div>
					
					<div className="text-left">
						<p> end or facilitate communications (i) between you and a Driver, such as estimated times of arrival (ETAs), or (ii) between you and a contact of yours at your direction in connection with your use of certain features, such as referrals, invites, split fare requests, or ETA sharing;</p>
					</div>
					
					<div className="text-left">
						<p>  Send you communications we think will be of interest to you, including information about products, services, promotions, news, and events of 247 Bahamas and other companies, where permissible and according to local applicable laws; and to process contest, sweepstake, or other promotion entries and fulfill any related awards;</p>
					</div>
					
					<div className="text-left">
						<p>Personalize and improve the Services, including to provide or recommend features, content, social connections, referrals, and advertisements.</p>
					</div>
					
					<div className="text-left">
						<p>We may transfer the information described in this Statement to, and process and store it in, the United States and other countries, some of which may have less protective data protection laws than the region in which you reside. Where this is the case, we will take appropriate measures to protect your personal information in accordance with this Statement.</p>
					</div>
					
					
					<h4 className="user-privacy">Sharing of Information</h4>
					
					<div className="text-left">
						<p>We may share the information we collect about you as described in this Statement or as described at the time of collection or sharing, including as follows:</p>
					</div>
					
					<h4 className="user-privacy">Through Our Services</h4>
					
					<h4 className="user-privacy">We may share your information:</h4>
					
					<div className="text-left">
						<p>With Drivers to enable them to provide the Services you request. For example, we share your name, photo (if you provide one), average User rating given by Drivers, and pickup and/or drop-off locations with Drivers;</p>
					</div>
					
					<h4 className="user-privacy">All Drivers are employed with 247 Bahamas.</h4>
					
					<div className="text-left">
						<p>With third parties to provide you a service you requested through a partnership or promotional offering made by a third party or us;</p>
					</div>
					
					<div className="text-left">
						<p>With the general public if you submit content in a public forum, such as blog comments, social media posts, or other features of our Services that is viewed by the general public;</p>
					</div>
					
					<div className="text-left">
						<p>With third parties with whom you choose to let us share information, for example other apps or websites that integrate with our API or Services, or those with an API or Service with which we integrate; and</p>
					</div>
					
					<div className="text-left">
						<p>With your employer (or similar entity) and any necessary third parties engaged by us or your employer (e.g., an expense management service provider), if you participate in 247 Bahamas for Business.</p>
					</div>
					
					<h4 className="user-privacy">We may share your information:</h4>
					
					<div className="text-left">
						<p>With 247 Bahamas subsidiaries and affiliated entities that provide services or conduct data processing on our behalf, or for data centralization and / or logistics purposes;</p>
					</div>
					
					<div className="text-left">
						<p>With vendors, consultants, marketing partners, and other service providers who need access to such information to carry out work on our behalf;</p>
					</div>
					
					<div className="text-left">
						<p>In response to a request for information by a competent authority if we believe disclosure is in accordance with, or is otherwise required by, any applicable law, regulation, or legal process;</p>
					</div>
					
					<div className="text-left">
						<p>With law enforcement officials, government authorities, or other third parties if we believe your actions are inconsistent with our User agreements, Terms of Service, or policies, or to protect the rights, property, or safety of 247 Bahamas or others;</p>
					</div>
					
					<div className="text-left">
						<p>In connection with, or during negotiations of, any merger, sale of company assets, consolidation or restructuring, financing, or acquisition of all or a portion of our business by or into another company;</p>
					</div>
					
					<div className="text-left">
						<p>If we otherwise notify you and you consent to the sharing; and In an aggregated and/or anonymized form which cannot reasonably be used to identify you.</p>
					</div>
					
					<h4 className="user-privacy">Social Sharing Features</h4>
					
					<div className="text-left">
						<p>The Services may integrate with social sharing features and other related tools which let you share actions you take on our Services with other apps, sites, or media, and vice versa. Your use of such features enables the sharing of information with your friends or the public, depending on the settings you establish with the social sharing service. Please refer to the privacy policies of those social sharing services for more information about how they handle the data you provide to or share through them.</p>
					</div>
					
					

					<div className="text-left">
						<p>We may allow others to provide audience measurement and analytics services for us, to serve advertisements on our behalf across the Internet, and to track and report on the performance of those advertisements. These entities may use cookies, web beacons, SDKs, and other technologies to identify your device when you visit our site and use our Services, as well as when you visit other online sites and services. For more information about these technologies and service providers, please refer to our Cookie Statement.</p>
					</div>		

					
					<h4 className="user-privacy">Account Information</h4>	
					
					<div className="text-left">
						<p>You may correct your account information at any time by logging into your online or in-app account. If you wish to cancel your account, please email us at support@247bahamas.com. Please note that in some cases we may retain certain information about you as required by law, or for legitimate business purposes to the extent permitted by law. For instance, if you have a standing credit or debt on your account, or if we believe you have committed fraud or violated our Terms, we may seek to resolve the issue before deleting your information.</p>
					</div>	
					
					<h4 className="user-privacy">Access Rights</h4>

					<div className="text-left">
						<p>247 Bahamas will comply with individual’s requests regarding access, correction, and/or deletion of the personal data it stores in accordance with applicable law.</p>
					</div>
				
					
					<h4 className="user-privacy">Location Information</h4>	
					
					<div className="text-left">
						<p>We request permission for our app’s collection of precise location from your device per the permission system used by your mobile operating system. If you initially permit the collection of this information, you can later disable it by changing the location settings on your mobile device. However, this will limit your ability to use certain features of our Services. Additionally, disabling our app’s collection of precise location from your device will not limit our ability to collect your trip location information from a Driver's device nor our ability to derive approximate location from your IP address.</p>
					</div>
				
					<h4 className="user-privacy">Contact Information</h4>	
					
					<div className="text-left">
						<p>We may also seek permission for our app’s collection and syncing of contact information from your device per the permission system used by your mobile operating system. If you initially permit the collection of this information, iOS users can later disable it by changing the contacts settings on your mobile device. The Android platform does not provide such a setting.</p>
					</div>
					
					<h4 className="user-privacy">Promotional Communications</h4>	
					
					<div className="text-left">
						<p>You may opt out of receiving promotional messages from us by following the instructions in those messages. If you opt out, we may still send you non-promotional communications, such as those about your account, about Services you have requested, or our ongoing business relations.</p>
					</div>
					
					<h4 className="user-privacy">Cookies and Advertising</h4>
			
					<div className="text-left">
						<p>Please refer to our Cookie Statement for more information about your choices around cookies and related technologies.</p>
					</div>
					
					<h4 className="user-privacy">Changes to the Statement</h4>
					
					<div className="text-left">
						<p>We may change this Statement from time to time. If we make significant changes in the way we treat your personal information, or to the Statement, we will provide you notice through the Services or by some other means, such as email. Your continued use of the Services after such notice constitutes your consent to the changes. We encourage you to periodically review the Statement for the latest information on our privacy practices.</p>
					</div>
						
					<h4 className="user-privacy">Contact Us</h4>

					<div className="text-left">
						<p>you have any questions about this Privacy Statement, please contact us at privacy@247bahamas.com, or write us at  247 Bahamas, Inc., Attn: Legal,The Bahamas.</p>
					</div>
				</div>
            </div>
        </div>
    );
}
