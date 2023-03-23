import { Card } from 'antd';
import { useState, useEffect } from 'react';
import { green, red, emphasisMidium } from '../../utilities/colors';
import mcsc from '../../images/valve/mcsc.png';
import mcsi from '../../images/valve/mcsi.png';
import mcso from '../../images/valve/mcso.png';
import misc from '../../images/valve/misc.png';
import misi from '../../images/valve/misi.png';
import miso from '../../images/valve/miso.png';
import mosc from '../../images/valve/mosc.png';
import mosi from '../../images/valve/mosi.png';
import moso from '../../images/valve/moso.png';

const getValve = (
  mainServoDegrees: number,
  supplyServoDegrees: number
): string => {
  if (mainServoDegrees === 0.0) {
    if (supplyServoDegrees === 0.0) return mcso;
    if (supplyServoDegrees === 60.0) return mcsc;
    return mcsi;
  }

  if (mainServoDegrees === 37.0) {
    if (supplyServoDegrees === 0.0) return moso;
    if (supplyServoDegrees === 60.0) return mosc;
    return mosi;
  }

  if (supplyServoDegrees === 0.0) return miso;
  if (supplyServoDegrees === 60.0) return misc;
  return misi;
};

const Valve = () => {
  const [mainServoDegrees, setMainServoDegrees] = useState<number>(0);
  const [supplyServoDegrees, setSupplyServoDegrees] = useState<number>(0);
  const [servoPosition, setServoPosition] = useState<
    'WAITING' | 'LAUNCH' | 'INVALID'
  >('INVALID');
  const [valve, setValve] = useState<string>(miso);

  useEffect(() => {
    if (mainServoDegrees === 0 && supplyServoDegrees === 0) {
      setServoPosition('WAITING');
    } else if (mainServoDegrees === 37 && supplyServoDegrees === 60) {
      setServoPosition('LAUNCH');
    } else {
      setServoPosition('INVALID');
    }

    setValve(getValve(mainServoDegrees, supplyServoDegrees));
  }, [mainServoDegrees, supplyServoDegrees]);

  useEffect(() => {
    window.electronAPI.valveRecieved(() => {
      setMainServoDegrees(
        Number(window.electronAPI.store.get('mainservo-degrees')) - 20.0
      );

      setSupplyServoDegrees(
        Number(window.electronAPI.store.get('supplyservo-degrees')) - 20.0
      );
    });

    return () => {
      window.electronAPI.remove('valve-recieved');
    };
  }, []);

  return (
    <Card title="VALVE" bordered={false}>
      <div style={{ display: 'flex' }}>
        <span
          style={{
            color: emphasisMidium,
            margin: 'auto auto auto 0',
            fontSize: '0.9em',
          }}
        >
          ポジション
        </span>
        <span
          style={{
            fontSize: '1.15em',
            color: servoPosition === 'INVALID' ? red : green,
            margin: 'auto 0 auto auto',
          }}
        >
          {servoPosition}
        </span>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          position: 'relative',
          marginTop: '16px',
        }}
      >
        <img width="100%" src={valve} alt="valve" />
        <div style={{ position: 'absolute', top: '8%', left: '30%' }}>
          <div>Supply</div>
          {`${supplyServoDegrees.toFixed(1)}°`}
        </div>
        <div style={{ position: 'absolute', top: '50%', left: '40%' }}>
          <div>Main</div>
          {`${mainServoDegrees.toFixed(1)}°`}
        </div>
      </div>
    </Card>
  );
};

export default Valve;
