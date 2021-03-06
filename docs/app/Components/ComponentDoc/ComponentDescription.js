import _ from 'lodash'
import React, { Component, PropTypes } from 'react'
import { Divider, Grid, Header, List } from 'stardust'
import META from 'src/utils/Meta'

const headerStyle = {
  fontSize: '2.2em',
}

const descriptionStyle = {
  fontSize: '1.2em',
}

export default class ComponentDescription extends Component {
  static propTypes = {
    /** Stardust component _meta object. */
    _meta: PropTypes.object.isRequired,

    /** Relative path to the component in the Stardust repo ('src/foo/bar/baz.js'). */
    docPath: PropTypes.string.isRequired,

    /** The gulp-docgen object for this component. */
    docgen: PropTypes.object.isRequired,
  };

  renderSemanticDocsLink = () => {
    const { _meta } = this.props
    if (!META.isSemanticUI(_meta) || !META.isParent(_meta)) {
      return null
    }
    const url = `http://semantic-ui.com/${_meta.type}s/${_meta.name}.html`.toLowerCase()
    return (
      <List.Item icon='book'>
        <a href={url} target='_blank'>
          Semantic UI Docs
        </a>
      </List.Item>
    )
  }

  renderSourceLink() {
    const { docPath } = this.props
    return (
      <List.Item icon='github'>
        <code>
          <a href={`https://github.com/TechnologyAdvice/stardust/blob/master/${docPath}`} target='_blank'>
            {docPath}
          </a>
        </code>
      </List.Item>
    )
  }

  renderRelated() {
    const { docgen: { docBlock: { tags } } } = this.props
    const seeTags = _.filter(tags, ['title', 'see'])
    if (_.isEmpty(seeTags)) return null

    const relatedLinks = _.map(seeTags, ({ title, description }) => {
      return (
        <a key={description} href={`#${description}`} className='item' style={{ display: 'inline-block' }}>
          {`<${description} />`}
        </a>
      )
    })

    return (
      <Grid.Row className='one column'>
        <Grid.Column>
          <Header.H3 className='grey'>Related</Header.H3>
          <List className='large bulleted'>
            {relatedLinks}
          </List>
        </Grid.Column>
      </Grid.Row>
    )
  }

  render() {
    const { _meta, docgen } = this.props
    return (
      <Grid>
        <Grid.Row className='two column'>
          <Grid.Column>
            <Header.H1 style={headerStyle}>{_.capitalize(_meta.name)}</Header.H1>
          </Grid.Column>
          <Grid.Column className='right aligned'>
            <List className='link' style={{ float: 'right' }}>
              {this.renderSourceLink()}
              {this.renderSemanticDocsLink()}
            </List>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className='one column'>
          <Grid.Column>
            <p style={descriptionStyle}>{docgen.docBlock.description}</p>
          </Grid.Column>
        </Grid.Row>
        {this.renderRelated()}
        <Divider className='hidden section' />
      </Grid>
    )
  }
}
