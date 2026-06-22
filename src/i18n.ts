import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      Dashboard: 'Dashboard',
      Admin_Panel: 'Admin Panel',
      Settings: 'Settings',
      Security_Status: 'Security Status',
      Status_Safe: 'All Systems Operational. Your device is secured.',
      Status_Risk: 'Security Risk Detected!',
      Live_Location: 'Live Location',
      SOS_Emergency: 'SOS Emergency',
      SOS_Active: 'SOS ACTIVE - LOCATION SHARED',
      Trigger_SOS: 'TRIGGER SOS',
      Cancel_SOS: 'Cancel SOS',
      Recent_Activity: 'Recent Activity',
      User_Management: 'User Management',
      Reports: 'Security Reports',
      Theme: 'Theme',
      Language: 'Language',
      No_Activity: 'No recent activity.',
      Name: 'Name',
      Email: 'Email',
      Role: 'Role',
      Status: 'Status',
      Action: 'Action',
      Map_Key_Missing: 'Google Maps API Key missing. Showing simulated map.',
      App_Title: 'SecureTrack',
      Login_Description: 'Login instantly to access your security dashboard.',
      Login_With_Google: 'Continue with Google',
      Sign_Out: 'Sign Out'
    }
  },
  hi: {
    translation: {
      Dashboard: 'डैशबोर्ड',
      Admin_Panel: 'एडमिन पैनल',
      Settings: 'सेटिंग्स',
      Security_Status: 'सुरक्षा स्थिति',
      Status_Safe: 'सभी सिस्टम काम कर रहे हैं। आपका डिवाइस सुरक्षित है।',
      Status_Risk: 'सुरक्षा जोखिम का पता चला!',
      Live_Location: 'लाइव लोकेशन',
      SOS_Emergency: 'एसओएस इमरजेंसी',
      SOS_Active: 'एसओएस सक्रिय - स्थान साझा किया गया',
      Trigger_SOS: 'एसओएस ट्रिगर करें',
      Cancel_SOS: 'एसओएस रद्द करें',
      Recent_Activity: 'हाल की गतिविधियां',
      User_Management: 'उपयोगकर्ता प्रबंधन',
      Reports: 'सुरक्षा रिपोर्ट',
      Theme: 'थीम',
      Language: 'भाषा',
      No_Activity: 'कोई हाल की गतिविधि नहीं।',
      Name: 'नाम',
      Email: 'ईमेल',
      Role: 'भूमिका',
      Status: 'स्थिति',
      Action: 'कार्रवाई',
      Map_Key_Missing: 'Google Maps API कुंजी गायब है। सिम्युलेटेड मैप दिखा रहा है।',
      App_Title: 'सिक्योरट्रैक',
      Login_Description: 'अपने सुरक्षा डैशबोर्ड तक पहुंचने के लिए तुरंत लॉगिन करें।',
      Login_With_Google: 'Google के साथ लॉगिन करें',
      Sign_Out: 'लॉग आउट'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;
