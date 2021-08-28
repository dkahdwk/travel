import { Platform } from 'react-native';
import styled from 'styled-components';
import constants from "@root/constants";

export const Container = styled.View`
  flex: 1;
  background-color: white;
`;

export const TopView = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding: 15px 15px 15px 0;
`;

export const TitleView = styled.View`
  padding: 15px 20px 0 20px;
`;

export const Title = styled.Text`
  color: #4f4f4f;
  font-size: 24px;
  font-family: Roboto-Thin;
`;

export const Username = styled.Text`
  color: #2ed6df;
  font-family: Roboto-Medium;
`;

export const TagView = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin: 50px 0 10px 15px;
`;

export const Tag = styled.Text`
  color: #333;
  font-size: 16px;
  font-family: Roboto-Regular;
  margin: 0 0 0 5px;
`;

export const BannerConainer = styled.View`
  width: 100%;
  height: 250px;
`;

export const BannerButton = styled.TouchableOpacity`
  width: ${constants.width}px;
  height: 250px;
  padding: 0 10px 0 10px;
`;

export const Banner = styled.Image`
  width: ${constants.width - 30}px;
  height: 250px;
  border-radius: 10px;
`

export const CircleView = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 15px 0 0 0;
`;

export const Circle = styled.View`
  width: 7px;
  height: 7px;
  border-radius: 100px;
  margin: 0 5px 0 5px;
`;

export const TrandButton = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 40px 15px 0 15px;
`;

export const TrandLeftView = styled.View`
  flex: 1;
`;

export const MenuTitle = styled.Text`
  color: #333;
  font-size: 21px;
  font-family: Roboto-Regular;
  margin: 0 0 5px 0;
`;

export const Subtitle = styled.Text`
  color: gray;
  font-size: 15px;
  font-family: Roboto-Thin;
`;

export const RightArrow = styled.Image`
  width: 10px;
  height: 18px;
`;

export const TrandGallery = styled.View`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  margin: 15px 0 0 0;
`;

export const GalleryButton = styled.TouchableOpacity`
  width: ${constants.width / 2 - 22.5}px;
  height: ${constants.width / 2 - 22.5}px;
  margin: 5px 0 5px 15px;
  border-radius: 5px;
`;

export const GalleryBackground = styled.View`
  width: ${constants.width / 2 - 22.5}px;
  height: ${constants.width / 2 - 22.5}px;
  background-color: rgba(0,0,0,0.25);
  border-radius: 5px;
  position: absolute;
  z-index: 1;
`;

export const GalleryImg = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 5px;
`;

export const GalleryTitle = styled.Text`
  color: white;
  font-size: 16px;
  font-family: Roboto-Medium;
  position: absolute;
  margin: 0 15px 10px 15px;
  bottom: 0;
  z-index: 2;
`;

export const MenuTitleView = styled.View`
  width: 100%;
  padding: 0 15px 0 15px;
  margin: 40px 0 20px 0;
`;

export const TravelReviewView = styled.TouchableOpacity`
  width: 100%;
  margin: 0 15px 15px 15px;
  position: relative;
`;

export const TravelReviewBackground = styled.View`
  width: ${constants.width - 30}px;
  height: 280px;
  border-radius: 10px;
  background-color: rgba(0,0,0,0.25);
  position: absolute;
  z-index: 1;
`;

export const TravelReviewImg = styled.Image`
  width: ${constants.width - 30}px;
  height: 280px;
  border-radius: 10px;
`;

export const TravelReviewText = styled.Text`
  color: white;
  font-size: 20px;
  font-family: Roboto-Medium;
  position: absolute;
  margin: 15px 15px 0 15px;
  top: 0;
  z-index: 2;
`;

export const MoreTravelButton = styled.TouchableOpacity`
  width: ${constants.width - 30}px;
  height: 50px;
  align-items: center;
  justify-content: center;
  border: 1px solid #2ed6df;
  border-radius: 3px;
  margin: 10px 15px 25px 15px;
`;

export const MoreTravelText = styled.Text`
  color: #6f6f6f;
  font-size: 14px;
  font-family: Roboto-Thin;
`;

export const Footer = styled.View`
  width: 100%;
  height: 200px;
  background-color: #ddd;
  padding: 15px 15px 15px 15px;
`;

export const FooterTitle = styled.Text`
  color: #333;
  font-size: 14px;
  font-family: Roboto-Thin;
  margin: 0 0 20px 0;
`;

export const FooterSubtitle = styled.Text`
  color: #5f5f5f;
  font-size: 13px;
  font-family: Roboto-Thin;
`;