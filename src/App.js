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
import styled, { keyframes } from 'styled-components';
import HeaderText from './HeaderText';
import axios from 'axios';

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

const Star = styled.div`
  display: inline-block;
  color: yellow;
  text-shadow: 1px, 1px, 1px, black;
  animation: ${rotate360 } 2s linear infinite;
`

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

const IssuesCard = StyledCard.extend`
  border: solid 4px red !important;
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
    if ( localStorage.repos )
    {
      this.setState( {
        repos: JSON.parse( localStorage.repos )
      } )
    } else
    {
      axios.get( 'https://api.github.com/users/alocke12992/repos?sort=created' )
        .then( res =>
        {
          localStorage.repos = JSON.stringify( res.data )
          this.setState( { repos: localStorage.repos } )
        } )
    }
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
              {
                const Component = r.open_issues > 0 ?
                  IssuesCard : StyledCard
                return (
                  <Grid.Column key={ r.id } width={ 4 }>
                    <Component>
                      <Card.Content>
                        <Card.Header>
                          <Truncated>
                            { r.full_name }
                          </Truncated>
                        </Card.Header>
                        <Card.Meta>
                          { r.description }
                        </Card.Meta>
                        { r.stargazers_count > 0 &&
                          <Star>
                            <Icon name="star" />
                          </Star>
                        }
                      </Card.Content>
                    </Component>
                  </Grid.Column>
                )
              } ) }
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