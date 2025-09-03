// Image imports for proper bundling
import heroImage from '@/assets/newhero.png';
import swiftDzire from '@/assets/swift-dzire.jpg';
import innovaCrysta from '@/assets/innova-crysta.jpg';
import tempoTraveller from '@/assets/tempo-traveller.jpg';
import meghalayaTour from '@/assets/meghalaya-tour.jpg';
import kazirangaSafari from '@/assets/kaziranga-safari.jpg';
import tawangMonastery from '@/assets/tawang-monastery.jpg';
import forceUrbania from '@/assets/force-urbania.jpg';
import meghalaya5day from '@/assets/meghalaya-5day.jpg';
// Placeholder images for new tours - these would be replaced with actual images
const aniniMechuka = meghalayaTour; // Using existing image as placeholder
const nagalandTour = tawangMonastery; // Using existing image as placeholder

export const images = {
  hero: heroImage,
  'swift-dzire': swiftDzire,
  'innova-crysta': innovaCrysta,
  'tempo-traveller': tempoTraveller,
  'meghalaya-tour': meghalayaTour,
  'kaziranga-safari': kazirangaSafari,
  'tawang-monastery': tawangMonastery,
  'force-urbania': forceUrbania,
  'anini-mechuka': aniniMechuka,
  'nagaland-tour': nagalandTour,
  'meghalaya-5day': meghalaya5day,
};

export const getImageUrl = (imagePath: string): string => {
  // Extract filename from path like "/src/assets/swift-dzire.jpg"
  const filename = imagePath.split('/').pop()?.replace('.jpg', '') || '';
  return images[filename as keyof typeof images] || imagePath;
};