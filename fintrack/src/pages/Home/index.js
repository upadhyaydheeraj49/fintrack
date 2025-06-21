import { FaArrowRightLong, FaCalculator, FaRobot, FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaRegCopyright } from "react-icons/fa";
import {Link, useNavigate} from 'react-router-dom'
import homeImage from '../../assets/images/homeImage.png';
import shieldImage from '../../assets/images/shieldImage.png';
import Navbar from '../../components/Navbar';
import fintracklogo from '../../assets/logo/fintracklogo.png'
import { Banner, BannerContainer, BannerContentContainer, BannerDescription, BannerHeading, BannerHeadingSpan, BannerImage, BannerImageContainer, BannerImageContainerSm, CardLink, CardsContainer, FeatureCard, FeatureCardDescription, FeatureCardHeading, FeatureCardIcon, FeaturesDescription, FeaturesHeading, FeaturesSection, NewFeatureCard, NewFeatureContentCard, NewFeatureDescription, NewFeatureImageCard, NewFeatureImageOuterContainer, NewFeatureSection, PrimaryButton, ShieldImage, AboutUsSection, AboutUsContainer, AboutUsCard, AboutUsCardLegal, Logo, SocialMediaContainer, AboutUsLabel, AboutUsLabelItem } from './styledComponents';

const Home = () => {
    const navigate = useNavigate()
    const onGetStarted = () => {
        navigate('/dashboard')
    }

    return (
        
        <BannerContainer>
            <Navbar/>
            <Banner>
                <BannerContentContainer>
                    <BannerHeading>
                        Smart Finance Management with <BannerHeadingSpan>FinTrack</BannerHeadingSpan>
                    </BannerHeading>
                    <BannerImageContainerSm>
                        <BannerImage src={homeImage} />
                    </BannerImageContainerSm>
                    <BannerDescription>Your Al-powered personal finance assistant designed for Indian
                        users to track expenses, manage budgets, and gain valuable
                        financial insights with support for all major Indian banks.
                    </BannerDescription>
                    <PrimaryButton onClick={onGetStarted}>Get Started <FaArrowRightLong style={{marginLeft: '10px'}} /></PrimaryButton>
                    <BannerDescription>Join 10,000+ Indian users managing their finances</BannerDescription>
                </BannerContentContainer>
                <BannerImageContainer>
                    <BannerImage src={homeImage} />
                </BannerImageContainer>
            </Banner>
            <FeaturesSection>
                <h2 style={{textAlign: 'center'}}>Features</h2>
                <FeaturesHeading>Everything you need to manage your finances</FeaturesHeading>
                <FeaturesDescription>FinTrack combines powerful tools with an intutive interface designed for Indian users to help<br/> you take control of your financial life.</FeaturesDescription>
                <CardsContainer>
                    <FeatureCard>
                        <FeatureCardIcon bgcolor='#b3ccff' style={{fontSize: '22px'}}><HiOutlineCurrencyRupee/></FeatureCardIcon>
                        <FeatureCardHeading>Indian Bank Support</FeatureCardHeading>
                        <FeatureCardDescription>Seamlessly import and categorize transactions from all major Indian banks including HDFC, ICICI, SBI, and stock brokers like Zerodha</FeatureCardDescription>
                        <CardLink href='/transactions'>View Transactions <MdKeyboardArrowRight style={{fontSize: '22px'}} /></CardLink>
                    </FeatureCard>
                    <FeatureCard>
                        <FeatureCardIcon bgcolor='#eeffcc' style={{fontSize: '22px'}}><FaCalculator /></FeatureCardIcon>
                        <FeatureCardHeading>Intelligent Budgeting</FeatureCardHeading>
                        <FeatureCardDescription>Create and monitor budgets with predictive analytics to stay on top of your finances and receive smart alerts.</FeatureCardDescription>
                        <CardLink href="/budgets">Manage Budgets <MdKeyboardArrowRight style={{fontSize: '22px'}} /></CardLink>
                    </FeatureCard>
                    <FeatureCard>
                        <FeatureCardIcon bgcolor='#ddccff' style={{fontSize: '22px'}}><FaRobot /></FeatureCardIcon>
                        <FeatureCardHeading>Finance AI Assistant</FeatureCardHeading>
                        <FeatureCardDescription>Get personalized financial insights and recommendations from our Al assistant to optimize your spending habits.</FeatureCardDescription>
                        <CardLink href="/finance-ai">Try Finance AI <MdKeyboardArrowRight style={{fontSize: '22px'}} /></CardLink>
                    </FeatureCard>
                </CardsContainer>
            </FeaturesSection>
            <NewFeatureSection>
                <NewFeatureCard>
                    <NewFeatureContentCard>
                        <NewFeatureDescription clr="green">Just Released</NewFeatureDescription>
                        <FeatureCardHeading>New Features Available!</FeatureCardHeading>
                        <NewFeatureDescription clr="#000000">We've just added powerful new features to help you better manage your finances and gain deeper insights:</NewFeatureDescription>
                        <ul style={{listStyleType: 'square'}}>
                            <li><NewFeatureDescription>Statement upload with automatic parsing for HDFC, ICICI, SBI, Zerodha and more</NewFeatureDescription></li>
                            <li><NewFeatureDescription>UPI transaction tracking for PhonePe, Google Pay, and BHIM</NewFeatureDescription></li>
                            <li><NewFeatureDescription>Interactive spending analytics and visualizations</NewFeatureDescription></li>
                            <li><NewFeatureDescription>Intelligent budget tracking with predictive alerts</NewFeatureDescription></li>
                        </ul>
                        <PrimaryButton onClick={onGetStarted}>Explore New Features <FaArrowRightLong style={{marginLeft: '10px'}} /></PrimaryButton>
                    </NewFeatureContentCard>
                    <NewFeatureImageOuterContainer>
                        <NewFeatureImageCard>
                            <ShieldImage src={shieldImage} alt="shield image" />
                        </NewFeatureImageCard>
                    </NewFeatureImageOuterContainer>
                </NewFeatureCard>
            </NewFeatureSection>
            <AboutUsSection>
                <AboutUsContainer>
                    <AboutUsCard>
                        <Logo src={fintracklogo} alt="logo"/>
                        <BannerDescription>Your AI-powered personal finance assistant for better financial management.</BannerDescription>
                        <SocialMediaContainer>
                            <Link to="/" style={{color: '#fff'}}>
                                <FaGithub style={{fontSize: '20px', paddingRight: '10px'}} />
                            </Link>
                            <Link to="/" style={{color: '#fff'}}>
                                <FaLinkedinIn style={{fontSize: '20px', paddingRight: '10px'}} />
                            </Link>
                        </SocialMediaContainer>
                    </AboutUsCard>
                    <AboutUsCard>
                        <AboutUsLabel>PRODUCT</AboutUsLabel>
                        <ul style={{listStyleType: 'none', paddingLeft: '10px'}}>
                            <AboutUsLabelItem>Dashboard</AboutUsLabelItem>
                            <AboutUsLabelItem>Transactions</AboutUsLabelItem>
                            <AboutUsLabelItem>Budgets</AboutUsLabelItem>
                            <AboutUsLabelItem>Reports</AboutUsLabelItem>
                        </ul>
                    </AboutUsCard>
                    <AboutUsCard>
                        <AboutUsLabel>SUPPORT</AboutUsLabel>
                        <ul style={{listStyleType: 'none', paddingLeft: '10px'}}>
                            <AboutUsLabelItem>Help Center</AboutUsLabelItem>
                            <AboutUsLabelItem>Documentation</AboutUsLabelItem>
                            <AboutUsLabelItem>Contact</AboutUsLabelItem>
                        </ul>
                    </AboutUsCard>
                    <AboutUsCardLegal>
                        <AboutUsLabel>LEGAL</AboutUsLabel>
                        <ul style={{listStyleType: 'none', paddingLeft: '10px'}}>
                            <AboutUsLabelItem>Privacy Policy</AboutUsLabelItem>
                            <AboutUsLabelItem>Terms of Service</AboutUsLabelItem>
                            <AboutUsLabelItem>Cookie Policy</AboutUsLabelItem>
                        </ul>
                    </AboutUsCardLegal>
                </AboutUsContainer>
                <hr style={{border: '1px solid rgb(36, 35, 35)'}} />
                <AboutUsContainer>
                    <FaRegCopyright style={{color: '#E8F1FA', padding: '8px'}} />
                    <BannerDescription>2025 FinTrack, All rights reserved.</BannerDescription>
                </AboutUsContainer>

            </AboutUsSection>
        </BannerContainer>
        
    )
}
export default Home
