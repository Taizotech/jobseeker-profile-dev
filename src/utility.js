import { da } from "date-fns/locale";
import moment from "moment-timezone";
import ReactDOM from "react-dom";

export const BaseUrl = process.env.REACT_APP_BASE_URL;
export const Baseurl = process.env.NODE_APP_BASE_URL;

console.log(BaseUrl);

export function calcAge(dateString) {
  // to calculate age
  let birthDate = new Date(dateString); // example birth date
  let today = new Date(); // current date

  let age = today.getFullYear() - birthDate.getFullYear();
  let monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
}

export function MyModal(props) {
  return ReactDOM.createPortal(
    props.children,
    document.getElementById("modal-root")
  );
}

// // change date format
// export function convertDateYYYYMMDD({ dateValue }) {
//   console.log(dateValue);
//   const istTime = moment(dateValue).tz("Asia/Kolkata").format("DD-MM-YYYY");
//   console.log(istTime);
//   return istTime;
// }

// // change date format
// export function convertDateYYYYMMDD(dateString) {
//   console.log(dateString);
//   const dateObj = new Date(dateString);
//   const year = dateObj.getFullYear();
//   const month = String(dateObj.getMonth() + 1).padStart(2, "0");
//   const day = String(dateObj.getDate()).padStart(2, "0");
//   const formattedDate = `${year}-${month}-${day}`;

//   return formattedDate;
// }

export function convertDateYYYYMMDD(dateString) {
  console.log(dateString);
  const dateObj = new Date(dateString);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  console.log(formattedDate);

  return formattedDate;
}

// to convert string into title case
export const toTitleCase = (phrase) => {
  return phrase
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .map((word) => word.replace(/[^a-zA-Z\s]/g, " ").trim())
    .join(" ")
    .trim();
};

export function numbersOnlyTest(val) {
  const regex = /^[0-9]*$/;
  return regex.test(val);
}

export function middleUrl() {
  let adminId = localStorage.getItem("adminId");

  if (adminId && numbersOnlyTest(adminId)) {
    return "admin";
  } else {
    return "chatbot";
  }
}

export function alphabetWithDotTest(val) {
  const regex = /^[a-zA-Z\s.]*$/;
  return regex.test(val);
}

export function emailRegex(val) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(val);
}

export function alphabetTest(val) {
  const Regex = /^[a-zA-Z\s]*$/;
  return Regex.test(val);
}

export function capitalizeWords(str) {
  return str ? str.replace(/\b\w/g, (char) => char.toUpperCase()) : "";
}


export const translate = {
  // hi- hi
  // en- En
  // ta- Ta
  name: {
    hi: "नाम",
    en: "Name",
    ta: "பெயர்",
  },
  initial: {
    hi: "प्रारंभिक",
    en: "Initial",
    ta: "பெயர்",
  },
  FatherName: {
    hi: "पिता का नाम",
    en: "Father Name",
    ta: "தந்தையின் பெயர்",
  },
  dateOfBirth: {
    hi: "जन्म की तारीख",
    en: "Date Of Birth",
    ta: "பிறந்த தேதி",
  },
  location: {
    hi: "स्थान",
    en: "Location",
    ta: "இடம்",
  },
  cityState: {
    hi: "शहर, राज्य",
    en: "City, State",
    ta: "நகரம், மாநிலம்",
  },
  gender: {
    hi: "लिंग",
    en: "Gender",
    ta: "பாலினம்",
  },
  educationQualfication: {
    hi: "शिक्षा योग्यता",
    en: "Educational Qualification",
    ta: "கல்வி தகுதி",
  },
  knownLanguages: {
    hi: "ज्ञात भाषाएं",
    en: "Known Language(s)",
    ta: "தெரிந்த மொழிகள்",
  },
  department: {
    hi: "विभाग",
    en: "Department",
    ta: "துறை",
  },
  completionYear: {
    hi: "समापन वर्ष",
    en: "Completion Year",
    ta: "நிறைவு ஆண்டு",
  },
  certificationCourse: {
    hi: "सर्टिफिकेशन कोर्स(ऐच्छिक)",
    en: "Certification Course (Optional)",
    ta: "சர்டிஃபிகேஷன் கோர்ஸ் (கட்டாயமில்லை)",
  },
  courses: {
    hi: "सर्टिफिकेशन कोर्स(ऐच्छिक)",
    en: "Certification Course (Optional)",
    ta: "சர்டிஃபிகேஷன் கோர்ஸ் (கட்டாயமில்லை)",
  },
  keySkills: {
    hi: "प्रमुख कौशल",
    en: "Key Skills",
    ta: "முக்கிய திறன்கள்",
  },
  ProfilePicture: {
    hi: "प्रोफाइल पिक्चर ",
    en: "Profile Picture",
    ta: "ப்ரொபைல் பிக்சர் ",
  },
  ResumeUpload: {
    hi: "बायोडाटा अपलोड",
    en: "Bio-Data Upload",
    ta: "பயோடேட்டா அப்லோட்",
  },
  upload: {
    hi: "अपलोड",
    en: "Upload",
    ta: "பதிவேற்றம்",
  },
  change: {
    hi: "बदलें",
    en: "Change",
    ta: "மாற்றம்",
  },
  ok: {
    hi: "ठीक है",
    en: "Ok",
    ta: "சரி",
  },
  preferNotToSay: {
    hi: "कहना नहीं चाहता",
    en: "Prefer not to say",
    ta: "சொல்ல விரும்பவில்லை",
  },
  male: {
    hi: "पुरुष",
    en: "Male",
    ta: "ஆண்",
  },
  female: {
    hi: "स्त्री",
    en: "Female",
    ta: "பெண்",
  },
  areYouStudent: {
    hi: "क्या आप विद्यार्थी हैं ?",
    en: "Are you a Student ?",
    ta: "நீங்கள் ஒரு மாணவரா ?",
  },
  years: {
    hi: "साल",
    en: "Years",
    ta: "ஆண்டுகள்",
  },
  months: {
    hi: "महीने",
    en: "Months",
    ta: "மாதங்கள்",
  },
  yes: {
    hi: "हाँ",
    en: "Yes",
    ta: "ஆம்",
  },
  no: {
    hi: "नहीं",
    en: "No",
    ta: "இல்லை",
  },
  showMeJobs: {
    hi: "मुझे नौकरी दिखाओ",
    en: "Show Me Jobs",
    ta: "எனக்கு வேலைகளைக் காட்டு",
  },
  selectKnownLanguage: {
    hi: "ज्ञात भाषाएं चुनें",
    en: "Select Known Language(s)",
    ta: "தெரிந்த மொழிகளை தேர்ந்தெடுக்கவும்",
  },
  selectCertificationCourse: {
    hi: "प्रमाणन पाठ्यक्रम का चयन करें",
    en: "Select Certification Courses",
    ta: "சான்றிதழ் படிப்புகளைத் தேர்ந்தெடுக்கவும்",
  },
  selectKeySkills: {
    hi: "कौशल चुनें",
    en: "Select Key Skills",
    ta: "முக்கிய திறன்கள் தேர்ந்தெடுக்கவும்",
  },
  selectCityState: {
    hi: "शहर, राज्य का चयन करें",
    en: "Select city, state",
    ta: "நகரம், மாநிலம் தேர்ந்தெடுக்கவும்",
  },
  max: {
    hi: "अधिकतम",
    en: "Max",
    ta: "அதிகபட்சம்",
  },
  PleaseFillThisField: {
    hi: "इस जगह को भरें",
    en: "Please fill out this field",
    ta: "இந்த இடத்தை நிரப்பவும்",
  },
  city: {
    hi: "शहर",
    en: "City",
    ta: "நகரம்",
  },
  state: {
    hi: "राज्य",
    en: "State",
    ta: "மாநிலம்",
  },
  submit: {
    hi: "सबमिट करो",
    en: "Submit",
    ta: "சமர்ப்பிக்கவும்",
  },
  Upload: {
    hi: "अपलोड ",
    en: "Upload",
    ta: "பதிவேற்றம்",
  },
  doYouHaveArrears: {
    hi: "क्या आपका कोई अरियर्स है?",
    en: "Do you have any arrears? ",
    ta: "உங்களுக்கு ஏதேனும் அரியர்ஸ் உள்ளதா?",
  },
  doYouHavePfEsi: {
    hi: "क्या आपके पास पहले से हि PF/ESI खाता है?",
    en: "Do you already have a PF/ESI account?",
    ta: "உங்களிடம் ஏற்கனவே PF/ESI கணக்கு உள்ளதா?",
  },

  WereLoadingYourProfile: {
    hi: "हम आपका प्रोफ़ाइल विवरण लोड कर रहे हैं। कृपया बैक बटन न दबाएं या इस पेज से बाहर न जाएं",
    en: "We're loading your profile details. Please do not press the back button or exit the page",
    ta: "நீங்கள் அளித்த சுயவிவரங்கள் பதிவேற்றப்படுகிறது. அதனால் இந்த பக்கத்திலிருந்து வெளியேறாமல் சிறிது நேரம் காத்திருக்கவும்.",
  },
  YourBioDataCreated: {
    hi: "आपका बायोडाटा सफलतापूर्वक बनाया गया है, अब आप हमारे व्हाट्सएप पर वापस आ सकते हैं और उपयुक्त नौकरी की तलाश कर सकते हैं",
    en: " Your Bio-Data has been created successfully, You can now return to our WhatsApp chat and look for a suitable job",
    ta: "உங்கள் பயோ-டேட்டா வெற்றிகரமாக உருவாக்கப்பட்டது, நீங்கள் இப்போது எங்கள் WhatsAppகுத் திரும்பி, பொருத்தமான வேலையைத் தேடலாம்",
  },
  AreYouSureSubmit: {
    hi: "क्या आप वाकई, सबमिट करना चाहते हैं ?",
    en: "Are you sure, you want to submit ?",
    ta: "நீங்கள் நிச்சயமாக சமர்ப்பிக்க விரும்புகிறீர்களா?",
  },
  doYouHaveExperience: {
    hi: "क्या आपके पास विनिर्माण इकाई में काम करने का अनुभव है?",
    en: "Do you have experience working in a manufacturing unit?",
    ta: "உங்களுக்கு உற்பத்தி பிரிவில் பணிபுரிந்த அனுபவம் உள்ளதா?",
  },
  PleaseDoLetWhichJobrole: {
    hi: "आप किस काम में रुचि रखते हैं?",
    en: "Please do let us know which job role you are interested in?",
    ta: "நீங்கள் எந்த வேலையில் பணிபுரிய ஆர்வமாக இருக்கிறீர்கள்?",
  },
  howManyYearsOfExperience: (text, lang) => {
    let howManyYearsOfExperience = {
      hi: `आपके पास ${text} के रूप में कितने वर्षों का अनुभव है?`,
      en: `How many years of experience do you have as a ${text} ?`,
      ta: `நீங்கள் எவ்வளவு காலமாக ${text}-ஆக  வேலை செய்கிறீர்கள்?`,
    };
    return howManyYearsOfExperience[lang];
  },
  selectIndustryJobrole: {
    hi: "कृपया उद्योग और नौकरी का चयन करें",
    en: "Select Industry, Job Role",
    ta: "தொழில் மற்றும் வேலையைத் தேர்ந்தெடுக்கவும்",
  },
  industry: {
    hi: "इंडस्ट्री ",
    en: "Industry",
    ta: "இண்டஸ்ட்ரி",
  },
  jobRole: {
    hi: "पद नाम",
    en: "Job Role",
    ta: "பதவிப்பெயர்",
  },
  pleaseEnterValidName: {
    hi: "कृपया अपना सही नाम दर्ज करें",
    en: "Please enter a valid name",
    ta: "உங்கள்  சரியான பெயரை உள்ளிடவும்",
  },
  currentLocation: {
    hi: "आपके वर्तमान स्थान",
    en: "Your current location",
    ta: "உங்கள் தற்போதைய இருப்பிடம்",
  },
  notFound: {
    hi: "आपके वर्तमान स्थान",
    en: "Not Found",
    ta: "பட்டியலில் இல்லை",
  },
  PleaseSelectFromList: {
    hi: "आपके वर्तमान स्थान",
    en: "Please select from the list",
    ta: "பட்டியலில் இருந்து தேர்ந்தெடுக்கவும்",
  },
  HowDidYouHearAboutTaizoApp: {
    hi: "आपने Taizo जॉब्स ऐप के बारे में कैसे सुना?",
    en: "How did you hear about Taizo jobs app?",
    ta: "Taizo ஜாப்ஸ் ஆப் பற்றி நீங்கள் எப்படிக் கேள்விப்பட்டீர்கள்?",
  },
  PleaseEnterCourseCompletionYear: {
    hi: "शिक्षा समापन वर्ष को YYYY के रूप में दर्ज करें",
    en: "Please enter the course completion year in YYYY format",
    ta: "படிப்பை முடித்த ஆண்டை YYYY வடிவத்தில் உள்ளிடவும்",
  },

  SelectPreferredjoblocation: {
    hi: "उन जगहों को चुनें जहां आप काम करना चाहते हैं",
    en: "Select preferred job location(s)",
    ta: "நீங்கள் வேலை செய்ய விரும்பும் இடங்களை தேர்வு செய்யுங்கள்",
  },
  CreateYourBioData: {
    hi: "अपना बायोडाटा बनाएं",
    en: "Create your Bio-data",
    ta: "உங்கள் பயோ-டேட்டாவை உருவாக்கவும்",
  },
  PleaseFillOutYourBioData: {
    hi: "कृपया अपना बायोडाटा बनाने के लिए नीचे विवरण भरें",
    en: "Please fill out the details below to create your bio-data",
    ta: "உங்கள் பயோ-டேட்டாவை உருவாக்க, கீழே உள்ள விவரங்களை நிரப்பவும்",
  },
  basicDetails: {
    hi: "मूल विवरण",
    en: "Basic Details",
    ta: "அடிப்படை விவரங்கள்",
  },
  OnlyAlphabetsAreAllowed: {
    hi: "केवल अक्षर की अनुमति है",
    en: "Only alphabets are allowed",
    ta: "எழுத்துக்கள் மட்டுமே அனுமதிக்கப்படுகின்றன",
  },
  AlphabetsAllowed: {
    hi: "केवल अक्षर की अनुमति है",
    en: "alphabets allowed",
    ta: "எழுத்துக்கள் மட்டுமே அனுமதிக்கப்படுகின்றன",
  },
  PleaseEnterValidNumber: {
    hi: "कृपया सही संख्या दर्ज करें",
    en: "Please enter a valid number",
    ta: "சரியான எண்ணை உள்ளிடவும்",
  },
  EducationDetails: {
    hi: "शिक्षा विवरण",
    en: "Education Details",
    ta: "கல்வி விவரங்கள்",
  },
  DoYouHaveAnyArrears: {
    hi: "क्या आपका कोई अरियर्स है?",
    en: "Do you have any arrears?",
    ta: "உங்களுக்கு ஏதேனும் அரியர்ஸ் உள்ளதா?",
  },
  WorkDetails: {
    hi: "नौकरी विवरण",
    en: "Work Details",
    ta: "வேலை விவரங்கள்",
  },
  WhereDoYouWantToWork: {
    hi: "आप कहां काम करना चाहते हैं?",
    en: "Where do you want to work?",
    ta: "நீங்கள் எங்கு வேலை செய்ய விரும்புகிறீர்கள்?",
  },
  CertificationCourseOptional: {
    hi: "प्रमाणन पाठ्यक्रम (वैकल्पिक)",
    en: "Certification Course (Optional)",
    ta: "சான்றிதழ் படிப்பு (விரும்பினால்)",
  },

  HowDoYouHearAboutUs: {
    hi: "आपने हमारे बारे में कैसे सुना",
    en: "How do you hear about us",
    ta: "எங்களைப் பற்றி நீங்கள் எப்படிக் கேள்விப்பட்டீர்கள்",
  },

  ByClickingConfirmYouAgreeToOur: {
    hi: "पुष्टि पर क्लिक करके, आप हमारे कानूनी रूप से बाध्यकारी अनुबंधों से सहमत होते हैं।",
    en: "By clicking confirm, you agree to our",
    ta: "உறுதிப்படுத்து என்பதைக் கிளிக் செய்வதன் மூலம், எங்களுடையதை ஒப்புக்கொள்கிறீர்கள்",
  },
  LetsBeginByCreatingYourBioData: {
    hi: "अपना बायोडाटा बनाकर शुरू करते हैं",
    en: "Let's begin by creating your bio data",
    ta: "உங்கள் பயோ-டேட்டாவை உருவாக்குவதன் மூலம் தொடங்குவோம்",
  },
  enterYourName: {
    hi: "अपना नाम दर्ज करें",
    en: "Enter Your Name",
    ta: "உங்கள் பெயரை உள்ளிடவும்",
  },
  enterYourInitial: {
    hi: "अपना प्रारंभिक दर्ज करें",
    en: "Enter Your Initial",
    ta: "உங்கள் பெயரை உள்ளிடவும்",
  },
  enterYourMobileNumber: {
    hi: "अपना मोबाइल संख्या दर्ज करें",
    en: "Enter your mobile number",
    ta: "உங்களுடைய மொபைல் எண்ணை உள்ளிடவும்",
  },
  pleaseEnterValidNumber: {
    hi: "कृपया वैध संख्या दर्ज करें",
    en: "Please enter valid number",
    ta: "சரியான எண்ணை உள்ளிடவும்",
  },
  next: {
    hi: "अगला",
    en: "Next",
    ta: "அடுத்தது",
  },
  back: {
    hi: "पीछे",
    en: "Back",
    ta: "முந்தைய",
  },
  preferredLocations: {
    hi: "पसंदीदा स्थान",
    en: "Preferred Locations",
    ta: "விருப்பமான இடங்கள்",
  },
  otherDetails: {
    hi: "अन्य विवरण",
    en: "Other Details",
    ta: "வேறு தகவல்கள்",
  },
  confirm: {
    hi: "पुष्टि करो",
    en: "Confirm",
    ta: "உறுதி",
  },
  CompaniesAreLookingForCandidates: {
    hi: `कंपनियां ऐसे उम्मीदवारों की तलाश कर रही हैं जो तुरंत ज्वाइन कर सकें। छात्र इस समय नौकरियों के लिए आवेदन नहीं कर सकते हैं।
पंजीकरण करने से पहले अपना पाठ्यक्रम पूरा करें।`,
    en: `Companies are looking for candidates who can join immediately. Students cannot apply for jobs at this time.
Complete your course before registering.`,
    ta: `நிறுவனங்கள் உடனடியாக சேரக்கூடிய நபர்களை தேடுகின்றன. இந்த நேரத்தில் மாணவர்கள் வேலைக்கு விண்ணப்பிக்க முடியாது.
பதிவு செய்வதற்கு முன் உங்கள் படிப்பை முடிக்கவும்.`,
  },
  note: {
    hi: "टिप्पणी",
    en: "Note",
    ta: "குறிப்பு",
  },
  thankYou: {
    hi: "धन्यवाद",
    en: " Thank You",
    ta: "நன்றி",
  },
  confirmation: {
    hi: "पुष्टीकरण",
    en: " Confirmation",
    ta: "உறுதிப்படுத்தல்",
  },
  areYouSureThatYouWanToSkip: {
    hi: "क्या आप वाकई इसे छोड़ना चाहते हैं?",
    en: " Are you sure that you want to skip?",
    ta: "நிச்சயமாக தவிர்க்க விரும்புகிறீர்களா?",
  },

  areYouSureThatYouWanToSkipAndContinue: {
    hi: "क्या आप इसे छोड़कर जारी रखना चाहते हैं?",
    en: "Are you sure that you want to skip And Continue?",
    ta: "இதைத் தவிர்த்துவிட்டுத் தொடர விரும்புகிறீர்களா?",
  },

  cancel: {
    hi: "रद्द करें",
    en: "Cancel",
    ta: "ரத்து செய்",
  },
  YesSkipSubmit: {
    hi: "हाँ, छोड़ें और सबमिट करें",
    en: "Yes, Skip & Submit",
    ta: "ஆம், தவிர் & சமர்ப்பி",
  },
  skip: {
    hi: "छोडना",
    en: "Skip",
    ta: "தவிர்க்கவும்",
  },
  yourChancesOfGettingJobIncreasedWithGoodProfilePic: {
    hi: "एक अच्छी प्रोफाइल पिक्चर से आपकी नौकरी मिलने की संभावना बढ़ सकती है",
    en: "Your chances of getting a job can be increased with a good profile picture",
    ta: "ஒரு நல்ல ப்ரொபைல் பிக்சர் உங்கள் வேலை கிடைப்பதற்கான வாய்ப்புகளை அதிகரிக்கும்",
  },
  yourChancesOfGettingJobIncreasedWithGoodResume: {
    hi: "एक अच्छा बायोडाटा आपको बेहतर नौकरी पाने में मदद करता है",
    en: "Your chances of getting a job can be increased with a Bio-Data",
    ta: "ஒரு நல்ல பயோடேட்டா உங்களுக்கு வேலை கிடைப்பதற்கான வாய்ப்புகளை அதிகரிக்கும்",
  },
  PleaseUploadYourPhoto: {
    hi: "कृपया अपना फोटो अपलोड करें",
    en: "Please upload your photo",
    ta: "உங்கள் புகைப்படத்தை பதிவேற்றவும்",
  },
  PleaseUploadYourResume: {
    hi: "कृपया अपना बायोडाटा अपलोड करें",
    en: "Please upload your Bio-Data",
    ta: "உங்கள் பயோடேட்டாவை அப்லோட் செய்யவும்",
  },
};
