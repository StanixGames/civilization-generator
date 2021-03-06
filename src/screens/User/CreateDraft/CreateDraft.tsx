import React, {useState, useEffect, useCallback} from 'react';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import Paper from '@material-ui/core/Paper';
// import Stepper from '@material-ui/core/Stepper';
// import Step from '@material-ui/core/Step';
// import StepLabel from '@material-ui/core/StepLabel';
// import Button from '@material-ui/core/Button';
// import Link from '@material-ui/core/Link';
// import Typography from '@material-ui/core/Typography';
// import Container from '@material-ui/core/Container';

// import {SettingsForm, IntroForm, BanForm, ResultForm, PlayerNationsCard} from '../../../components';
// // import bgImg from './bg.jpg';
// import {users, nations} from '../../../store';
// import {Nation, Player, AI} from '../../../types';

// import {useStyles} from './styles';


// const NATIONS_COEFS = [
//   5.666666667,
//   7.333333333,
//   4.666666667,
//   8.666666667,
//   9.666666667,
//   9,
//   4.333333333,
//   4,
//   6,
//   6,
//   7.333333333,
//   2,
//   3.333333333,
//   9,
//   7.666666667,
//   6,
//   7,
//   6.666666667,
//   6.333333333,
//   6.666666667,
//   5.666666667,
//   8.666666667,
//   5.666666667,
//   5.666666667,
//   8.333333333,
//   8.666666667,
//   7.666666667,
//   5,
//   6.666666667,
//   4.333333333,
//   9.333333333,
//   8.666666667,
//   3.666666667,
//   7.333333333,
//   5,
//   8.333333333,
//   8.333333333,
//   6,
//   3,
//   4.666666667,
//   3,
//   7,
//   4.666666667,
// ];
// const NATIONS_KEYS = Object.keys(Nation);
// const NATIONS = NATIONS_KEYS.sort((a: string, b: string) => {
//   const coefA = NATIONS_COEFS[NATIONS_KEYS.indexOf(a)];
//   const coefB = NATIONS_COEFS[NATIONS_KEYS.indexOf(b)];
  
//   return coefB - coefA;
// });
// const reserved: string[] = [];

// function getRandomNation(bannedNations: string[], list: string[]): { nation: string, coef: number } {
//   const enums = list.filter((nation) => {
//     return !reserved.includes(nation) && !bannedNations.includes(nation);
//   });
//   const randomNation = enums[Math.floor(Math.random() * enums.length)];
//   // if (!randomNation) {
//   //   console.log('EMPTYYYY', enums, enums.length);
//   // }
//   const nationCoef = NATIONS_COEFS[NATIONS.indexOf(randomNation)];
//   reserved.push(randomNation);

//   return {
//     nation: randomNation,
//     coef: nationCoef,
//   };
// }

// const COLORS = ['#FF6633', '#CCFF1A', '#3366E6', '#FFFF99', '#00B3E6', 
// '#E6B333', '#FF33FF', '#999966', '#99FF99', '#B34D4D',
// '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
// '#FF99E6', '#FFB399', '#FF1A66', '#E6331A', '#33FFCC',
// '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
// '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
// '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
// '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
// '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
// '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

// function generateNations<T extends Player | AI>(type: string, size: number, draftsSize: number, minCoef: number, maxCoef: number, bannedNations: string[]): Array<T> {
//   const res = new Array(size);

//   for (let p = 0; p < size; p += 1) {
//     const filteredNations = NATIONS.filter((nation) => {
//       const nationCoef = NATIONS_COEFS[NATIONS.indexOf(nation)];

//       return nationCoef >= minCoef && nationCoef <= maxCoef;
//     });

//     if (type === 'players') {
//       res[p] = {
//         name: `Player ${p + 1}`,
//         color: COLORS[p],
//         nations: [],
//       };
//       for (let i = 0; i < draftsSize; i+=1) {
//         const randomNation = getRandomNation(bannedNations, filteredNations);
//         res[p].nations.push(randomNation);
//       }
//     } else {
//       const randomNation = getRandomNation(bannedNations, filteredNations);
//       res[p] = {
//         name: `AI ${p + 1}`,
//         color: COLORS[p],
//         ...randomNation,
//       };
//     }
//   }

//   return res;
// }

// interface FormDataType {
//     step: number;
//     playersNumber: number;
//     AINumber: number;
//     banned: string[];
//     players: Player[];
//     AIs: AI[];
//     draftsNumber: number;
//     minCoef: number;
//     maxCoef: number;
//     onSetMinCoef: (number: number) => void;
//     onSetMaxCoef: (number: number) => void;
//     onSetPlayersNumber: (number: number) => void;
//     onSetAINumber: (number: number) => void;
//     onNewRandom: () => void;
//     onToggleBanned: (nation: string) => void;
//     onSetDraftsNumber: (number: number) => void;
//   }
  
//   function getStepContent(formData: FormDataType) {
//     switch (formData.step) {
//       case 0:
//         return (
//           <SettingsForm
//             playersNumber={formData.playersNumber}
//             AINumber={formData.AINumber}
//             draftsNumber={formData.draftsNumber}
//             minCoef={formData.minCoef}
//             maxCoef={formData.maxCoef}
//             onSetMinCoef={formData.onSetMinCoef}
//             onSetMaxCoef={formData.onSetMaxCoef}
//             onSetPlayersNumber={formData.onSetPlayersNumber}
//             onSetAINumber={formData.onSetAINumber}
//             onSetDraftsNumber={formData.onSetDraftsNumber}
//           />
//         );
//       case 1:
//         return (
//           <BanForm
//             banned={formData.banned}
//             minCoef={formData.minCoef}
//             maxCoef={formData.maxCoef}
//             onToggleBanned={formData.onToggleBanned}
//           />
//         );
//       case 2:
//         return (
//           <ResultForm
//             players={formData.players}
//             AIs={formData.AIs}
//             onNewRandom={formData.onNewRandom}
//           />
//         );
//       default:
//         throw new Error('Unknown step');
//     }
//   }

// const steps = ['Game Settings', 'Ban nations', 'Random nations'];

// export function CreateDraft() {
//   const classes = useStyles();
//   const [activeStep, setActiveStep] = useState(0);
//   const [draftsNumber, setDraftsNumber] = useState<number>(3);
//   const [minCoef, setMinCoef] = useState<number>(1);
//   const [maxCoef, setMaxCoef] = useState<number>(10);
//   const [playersNumber, setPlayersNumber] = useState<number>(0);
//   const [AINumber, setAINumber] = useState<number>(4);
//   const [bannedNations, setBannedNations] = useState<string[]>([]);
//   const [generatedPlayers, setGeneratedPlayers] = useState<Player[]>([]);
//   const [generatedAIs, setGeneratedAIs] = useState<AI[]>([]);

//   const handleNext = useCallback(() => {
//         if (activeStep === 1) {
//           const players = generateNations<Player>('players', playersNumber, draftsNumber, minCoef, maxCoef, bannedNations);
//           const AIs = generateNations<AI>('AI', AINumber, 1, minCoef, maxCoef, bannedNations);
    
//           console.log('AI', AIs);
//           setGeneratedPlayers(players);
//           setGeneratedAIs(AIs);
//         }
//         setActiveStep(activeStep + 1);
//       }, [activeStep, playersNumber, AINumber, draftsNumber, minCoef, maxCoef, bannedNations, setGeneratedPlayers, setGeneratedAIs, setActiveStep]);
    
//       const handleBack = () => {
//         setActiveStep(activeStep - 1);
//       };
    
//       const handleNewRandom = useCallback(() => {
//         setActiveStep(0);
//       }, [setActiveStep]);
    
//       const handleToggleBannedNation = useCallback((value: string) => () => {
//         const currentIndex = bannedNations.indexOf(value);
//         const newBanned = [...bannedNations];
    
//         if (currentIndex === -1) {
//           newBanned.push(value);
//         } else {
//           newBanned.splice(currentIndex, 1);
//         }
    
//         setBannedNations(newBanned);
//       }, [bannedNations, setBannedNations]);
    
//       const handleSetPlayersNumber = useCallback((value: number) => {
//         setPlayersNumber(value);
//       }, [setPlayersNumber]);
    
//       const handleSetAINumber = useCallback((value: number) => {
//         setAINumber(value);
//       }, [setAINumber]);
    
//       const handleSetDraftsNumber = useCallback((value: number) => {
//         setDraftsNumber(value);
//       }, [setDraftsNumber]);
    
//       const formData = {
//         step: activeStep,
//         playersNumber,
//         AINumber,
//         banned: bannedNations,
//         players: generatedPlayers,
//         AIs: generatedAIs,
//         draftsNumber: draftsNumber,
//         minCoef,
//         maxCoef,
//         onSetMinCoef: setMinCoef,
//         onSetMaxCoef: setMaxCoef,
//         onSetPlayersNumber: handleSetPlayersNumber,
//         onSetAINumber: handleSetAINumber,
//         onNewRandom: handleNewRandom,
//         onToggleBanned: handleToggleBannedNation,
//         onSetDraftsNumber: handleSetDraftsNumber,
//       };

//   return (
//       <main className={classes.layout}>
//       <div className={classes.paper}>
//         <Stepper activeStep={activeStep} className={classes.stepper}>
//           {steps.map((label) => (
//             <Step key={label}>
//               <StepLabel>{label}</StepLabel>
//             </Step>
//           ))}
//         </Stepper>
//         <div className={classes.stepFormWrapper}>
//           {activeStep === steps.length ? (
//             <React.Fragment>
//               <Typography variant="h5" gutterBottom>
//                 Result
//               </Typography>
//               <PlayerNationsCard name="Player 1" />
//               <PlayerNationsCard name="Player 1" />
//               <PlayerNationsCard name="Player 1" />
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={() => {}}
//                 className={classes.button}
//               >Copy as text</Button>
//             </React.Fragment>
//           ) : (
//             <React.Fragment>
//               {getStepContent(formData)}
//               {activeStep < 2 && (
//                 <div className={classes.buttons}>
//                   {activeStep !== 0 && (
//                     <Button onClick={handleBack} className={classes.button}>
//                       Back
//                     </Button>
//                   )}
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     onClick={handleNext}
//                     className={classes.button}
//                   >
//                     {activeStep === 1 ? 'Generate' : 'Next'}
//                   </Button>
//                 </div>
//               )}
//             </React.Fragment>
//           )}
//         </div>
//       </div>
//       </main>
//   );
// }

export const CreateDraft = () => (<div>1</div>)