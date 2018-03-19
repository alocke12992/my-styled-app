import React from 'react';
import
{
  Header,
  Button,
  Segment,
  Card,
  Icon,
  Grid,
} from 'semantic-ui-react';
import styled from 'styled-components';
import HeaderText from './HeaderText';
import axios from 'axios';

const AppContainer = styled.div`
background: linear-gradient(to bottom right, #004e92, #000428);
background-size: cover;
// Light blue to deep blue #1cb5e0, #000046 
// Sky White to Blue #076585, #fff
// Evening Night #fffde4, #005aa7
// Frost #004e92, #000428
  `

const Transparent = styled.div`
  background: transparent !important; 
`

const StyledCard = styled( Card ) `
  height: 200px;
`

const Truncated = styled.div`
  width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; 
`

const fontSize = ( size ) =>
{
  switch ( size )
  {
    case 'large':
      return '4rem'
    case 'small':
      return '1rem'
    default:
      return '2rem'
  }
}

class App extends React.Component
{
  state = { repos: [] }

  componentDidMount()
  {
    axios.get( 'https://api.github.com/users/alocke12992/repos?sort=created' )
      .then( res => this.setState( { repos: res.data } ) )
  }

  render()
  {
    return (
      <AppContainer>
        <Header fSize='large' as={ HeaderText }>
          My Portfolio
        </Header>
        <Segment as={ Transparent }>
          <Header as={ HeaderText }>
            My Projects
          </Header>
          <Grid>
            <Grid.Row>
              { this.state.repos.map( r =>
                <Grid.Column key={ r.id } width={ 4 }>
                  <StyledCard>
                    <Card.Content>
                      <Card.Header>
                        <Truncated>
                          { r.full_name }
                        </Truncated>
                      </Card.Header>
                      <Card.Meta>
                        { r.description }
                      </Card.Meta>
                    </Card.Content>
                  </StyledCard>
                </Grid.Column>
              )
              }
            </Grid.Row>
          </Grid>
        </Segment>
        <Segment as={ Transparent }>
          <Header as={ HeaderText }>
            Contact
          </Header>
        </Segment>
      </AppContainer>
    )
  }
}

export default App;