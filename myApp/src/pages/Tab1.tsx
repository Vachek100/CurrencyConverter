import { IonButton, IonContent, IonHeader, IonIcon, IonPage } from '@ionic/react';
import './Tab1.css';
import Card from './Card';
import { reorderThree } from 'ionicons/icons';


import "./Tab1.css"

const Tab1: React.FC = () => {
    return (
        <IonPage>
            <IonHeader style={{ marginBottom: "15px" }}>
                <div style={{ borderRadius: "0px", display: "flex", width: "100%", height: "75px", backgroundColor: "#06402B", justifyContent: "space-between", paddingRight: "10px" }}>
                    <img src="https://www.freeiconspng.com/uploads/money-transfer-icon-17.png" width="125" height="50" style={{ marginBlock: "auto" }} alt="Icon Money Transfer Symbol" />
                    <IonButton
                        shape="round"
                        className="swap-button"
                        style={{ marginBlock: "auto", marginInline: "0px" }}
                    >
                        <IonIcon slot="icon-only" icon={reorderThree} />
                    </IonButton>
                </div>
            </IonHeader>
            <IonContent style={{ paddingInline: "10px" }} fullscreen>
                <div style={{ width: "100%", alignContent: "center" }}>
                    <h1 style={{ width: "fit-content", marginInline: "auto" }} >CNB Exchange Rates</h1>
                    <p style={{ width: "fit-content", marginInline: "auto", marginBottom: "25px" }} >Check live foreign currency exchange rates</p>
                </div>
                <Card />
            </IonContent>
        </IonPage>
    );
};

export default Tab1;
