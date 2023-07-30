import { AuthorName, AuthorsContainer, FooterImage, FooterWrapper } from "./Footer.styles"
import footerSvg from "../../../Assets/FooterSvg.svg"
const Footer = () => {
    return (
        <FooterWrapper>
            <FooterImage src={footerSvg}/>
            <AuthorsContainer>
                <AuthorName>Krzysztof Dziedzic</AuthorName>
                <AuthorName>Ewelina Woińska</AuthorName>
            </AuthorsContainer>
        </FooterWrapper>
    )
}

export default Footer;