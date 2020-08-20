import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import basicsStyle from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Restore from "@material-ui/icons/Restore";
import { Engine } from 'json-rules-engine';
import Divider from '@material-ui/core/Divider';
import Tooltip from "@material-ui/core/Tooltip";

import surubiConditions from '../../../fishies/surubi.js';
import taruchaConditions from '../../../fishies/tarucha.js';
import carpaConditions from '../../../fishies/carpa.js';
import doradoConditions from '../../../fishies/dorado.js';
import pejerreyConditions from '../../../fishies/pejerrey.js';

const classifiedFishAtributes = [
  {
    classificationName: 'Pez',
    attributes: {
      'Profundidad': ["Superficial", "Media", "Grande"],
      'Tamaño': ["Chico", "Mediano", "Grande"]
    }
  },
  {
    classificationName: 'Caña',
    attributes: {
      'Telescopica': ["Si", "No", "Cualquiera"],
      'Diametro Linea': ["0.2", "0.4"],
      'Tamaño Reel': ["Chico", "Mediano", "Grande"],
      'Freno': ["Si", "No"],
      'Carnada': ["Mojarra", "Anguila", "Lombriz", "Bagre"],
      'Plomada': ["Si", "No"],
      'Peso Plomada': ["Bajo", "Medio", "Alto"]
    }
  },
  {
    classificationName: 'Ambiente',
    attributes: {
      'Estacion': ["Verano", "Invierno", "Otoño", "Primavera"],
      'Temperatura': ["Cálida", "Templada"],
      'Estado del agua': ["Tranquila", "Normal", "Corredera", "Revuelta"],
      'Horario': ["Mañana", "Tarde", "Noche"]
    }
  }
];

var engine = new Engine()

engine.addRule({
  conditions: {
    all: surubiConditions
  },
  event: {
    type: 'Pez Disponible',
    params: {
      message: 'Surubí'
    }
  }
});

engine.addRule({
  conditions: {
    all: taruchaConditions
  },
  event: {
    type: 'Pez Disponible',
    params: {
      message: 'Tarucha Azul'
    }
  }
});

engine.addRule({
  conditions: {
    all: carpaConditions
  },
  event: {
    type: 'Pez Disponible',
    params: {
      message: 'Carpa'
    }
  }
});

engine.addRule({
  conditions: {
    all: doradoConditions
  },
  event: {
    type: 'Pez Disponible',
    params: {
      message: 'Dorado'
    }
  }
});

engine.addRule({
  conditions: {
    all: pejerreyConditions
  },
  event: {
    type: 'Pez Disponible',
    params: {
      message: 'Pejerrey'
    }
  }
});
class SectionBasics extends React.Component {


  constructor(props) {
    super(props);
   
    this.state = {
      facts: {
        'Estacion': '',
        'Temperatura': '',
        'Estado del agua': '',
        'Profundidad': '',
        'Horario': '',
        'Tamaño': '',
        'Carnada': '',
        'Telescopica': '',
        'Tamaño Reel': '',
        'Freno': '',
        'Diametro Linea': '',
        'Plomada': '',
        'Peso Plomada': '',
      },
      fishies: [],
    }
    engine.on('success', (event, almanac, ruleResult) => {
      let listFish = this.state.fishies;
      listFish.push({message: event.params.message, color: 'success', tooltip: 'Cumple todas las condiciones'});
      this.setState({ fishies: listFish});
    })
    engine.on('failure', (event, almanac, ruleResult) => {
      let listFish = this.state.fishies;
      const details = ruleResult.conditions.all.filter(condition => !condition.result)
      .map(condition => {
        switch (condition.operator) {
          case 'any':
            return `${condition.any[0].fact}`
        }
      });
      listFish.push({message: event.params.message, color: details.length == 1 ? 'warning' : 'danger', tooltip: 'No cumple con ' + details.join(', ')});
      this.setState({ fishies: listFish});
    })
    
    
    // Run the engine to evaluate
    this.updateEngine();


    this.handleChangeEnabled = this.handleChangeEnabled.bind(this);
  }

  handleChangeEnabled = atributo => event => {
    let newValue = event.target.value;
    let newFacts = this.state.facts;
    newFacts[atributo] = newValue;
    this.setState({ facts: newFacts, fishies: [] });
    this.updateEngine();
  };

  handleClean = atributo => {
    let newValue = "";
    let newFacts = this.state.facts;
    newFacts[atributo] = newValue
    this.setState({ facts: newFacts, fishies: [] });
    this.updateEngine();
  };

  reset = () => {
    this.setState({
          facts: {
            'Estacion': '',
            'Temperatura': '',
            'Estado del agua': '',
            'Profundidad': '',
            'Horario': '',
            'Tamaño': '',
            'Carnada': '',
            'Telescopica': '',
            'Tamaño Reel': '',
            'Freno': '',
            'Diametro Linea': '',
            'Plomada': '',
            'Peso Plomada': '',
          },
          fishies: [],
        }, () => {
          // Run the engine to evaluate
          this.updateEngine();
        })
  };

  updateEngine(){
    return engine
    .run(this.state.facts)
    // .then(events => { // run() returns events with truthy conditions
    //   let listFish = [];
    //   events.map(event => listFish.push({message: event.params.message, color: 'success', tooltip: 'Cumple todas las condiciones'}));
    //   this.setState({ fishies: listFish});
    // })
    ;
  }


  render() {
    const { classes } = this.props;
    return (
      <div className={classes.sections}>
        <div className={classes.container}>
          <h4 className={classes.title}>
            Recomendaciones
          </h4>
          <div className={classes.title}>
            { this.state.fishies.map(fish => 
            <Tooltip
              title={fish.tooltip}
              placement="bottom"
            >
              <Button
                  color={fish.color}
                  style={{
                    "pointerEvents": "none !important",
                    cursor: "default"
                  }}
                >
                  {fish.message}
                </Button>
            </Tooltip>
            )}
          </div>
          <GridContainer justify="center">
            <GridItem xs={10}>
              <h4 className={classes.title}>
                Condiciones:
              </h4>
            </GridItem>
            <GridItem xs={2}>
              <Button
                round
                justIcon
                color="warning"
                onClick={this.reset.bind(this)}
              >
                <Restore className={classes.icons} />
              </Button>
            </GridItem>
          </GridContainer>
          <div id="checkRadios">
            {classifiedFishAtributes.map(classification => 
              <div>
                <h4 className={classes.title}>{classification.classificationName}</h4>
                <Divider light />
                {Object.entries(classification.attributes).map(
                  ([atribute, values]) => 
                    <div>
                      <div className={classes.title}>
                        {atribute}
                      </div>
                      <div style={{display: 'flex'}}>
                      { values.map(option => 
                        <div
                          className={
                            classes.checkboxAndRadio +
                            " " +
                            classes.checkboxAndRadioHorizontal
                          }
                        >
                          <FormControlLabel
                            control={
                              <Radio
                                checked={this.state.facts[atribute] === option}
                                onChange={this.handleChangeEnabled(atribute)}
                                value={option}
                                icon={
                                  <FiberManualRecord
                                    className={classes.radioUnchecked}
                                  />
                                }
                                checkedIcon={
                                  <FiberManualRecord
                                    className={classes.radioChecked}
                                  />
                                }
                                classes={{ checked: classes.radio }}
                              />
                            }
                            classes={{ label: classes.label }}
                            label={option}
                          />
                        </div>
                      )}
                      <Button
                        color="warning"
                        size="sm"
                        onClick={() => this.handleClean(atribute)}
                      >
                        Reset
                      </Button>
                      </div>
                    </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(basicsStyle)(SectionBasics);
