import styled from 'styled-components'

export const BannerContainer = styled.div`
min-width: 768px;
max-width: 100vw;
min-height: 80vh;
background-color: #0E3D64;
`
export const Banner = styled.div`
min-height: 70vh;
display: flex;
justify-content: space-between;
align-items: center;
padding: 15px;
@media screen and (min-width: 900px) {
padding: 15px 10%;
}
`

export const BannerContentContainer = styled.div`
display: flex;
flex-direction: column;
width: 40%;
max-width: 500px;
margin-right: 40px;
`
export const BannerHeading = styled.h1`
font-size: 45px;
font-family: 'Roboto';
font-weight: 700;
color: #E8F1FA;
`
export const BannerHeadingSpan = styled.span`
color: #2277EC;
`

export const BannerDescription = styled.p`
color:rgba(232, 241, 250, 0.72);
font-size: 16px;
font-family: 'Roboto';
`
export const BannerImageContainer = styled.div`
background-color: #E8F1FA;
border-radius: 10px;
width: 400px;
height: 400px;
overflow: hidden;
box-shadow: 0px 0px 10px 2px #ffffff`

export const BannerImage = styled.img`
width: 100%;
`

export const PrimaryButton = styled.button`
color: #E8F1FA;
background-color: #2277EC;
font-size: 15px;
font-family: 'Roboto';
padding: 8px 15px;
border: none;
border-radius: 5px;
outline: none;
align-self: flex-start;
display: flex;
align-items: center;
justify-content: space-between;
cursor: pointer;
`
export const FeaturesSection = styled.div`
background-color: #E8F1FA;
max-width: 100vw;
padding: 35px;
padding-bottom: 80px;
@media screen and (min-width: 900px) {
padding: 35px 10%;
}
`
export const FeaturesHeading = styled.h2`
color: #000000;
font-size: 35px;
font-weight: 600;
font-family: 'Roboto';
text-align: center;
`
export const FeaturesDescription = styled(BannerDescription)`
color: #000000;
text-align: center;
font-size: 16px;`

export const CardsContainer = styled.div`
display: flex;
justify-content: space-between;
margin-top: 60px;`

export const FeatureCard = styled.div`
background-color: #ffffff;
padding: 15px;
border-radius: 10px;
width: 180px;
flex-grow: 1;
margin: 10px;
max-width: 350px;
box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.45)`

export const FeatureCardIcon = styled.div`
width: 50px;
height: 50px;
background-color: ${props => props.bgcolor};
display: flex;
justify-content: center;
align-items: center;
border-radius: 10px;`

export const FeatureCardHeading = styled.h4`
color: #000000;
font-size: 22px;
font-family: 'Roboto';
font-weight: 600;
margin: 5px 0px;
`
export const FeatureCardDescription = styled(FeaturesDescription)`
font-size: 15px;
text-align: left;`

export const CardLink = styled.a`
color: #2277EC;
font-size: 14px;
font-family: 'Roboto';
cursor: pointer;
font-weight: 500;
display: flex;
align-items: center;
text-decoration: none;`

export const NewFeatureSection = styled(FeaturesSection)`
background-color: #ffffff;`

export const NewFeatureCard = styled.div`
background-color: #E8F1FA;
border-radius: 15px;
padding: 25px;
display: flex;
align-items: center;
justify-content: space-between;`

export const NewFeatureContentCard = styled.div`
display: flex;
flex-direction: column;
padding: 20px;`

export const NewFeatureDescription = styled.p`
color: ${props => props.clr};
font-size: 16px;
font-family: 'Roboto';`

export const NewFeatureImageOuterContainer = styled.div`
background-color: #ffffff;
border-radius: 10px;
padding: 20px;
`

export const NewFeatureImageCard = styled.div`
background-color: #E8F1FA;
padding: 100px;
`
export const ShieldImage = styled.img`
width: 100px;
`
export const AboutUsSection = styled(FeaturesSection)`
background-color: #000033;
`
export const AboutUsContainer = styled.div`
display: flex;
align-items: center;
justify-content: center;
`
export const AboutUsCard = styled.div`
width: 25%;
padding-right: 20px;`

export const Logo = styled.img`
width: 150px;`

export const SocialMediaContainer = styled.div`
display: flex;
width: 12%;
justify-content: space-between;`

export const AboutUsLabel = styled(BannerDescription)`
font-weight: 600;`

export const AboutUsLabelItem = styled.li`
color: rgba(232, 241, 250, 0.72);
font-size: 14px;
font-family: 'Roboto';
padding-bottom: 10px;`