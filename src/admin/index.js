import CMS from "netlify-cms"
import styles from '!css-loader!sass-loader!../../node_modules/bootstrap/scss/bootstrap.scss';

// Initialize the CMS object
CMS.init()
CMS.registerPreviewStyle(styles.toString(), { raw: true })


var PostPreview = createClass({
  render: function() {
    const { entry, getAsset, widgetsFor } = this.props
    const imagePath = entry.getIn(['data', 'image'])
    const image = getAsset(imagePath)
    

    return h('div', { className: 'container' },
       h('div', { className: 'row' },
         h('div', { className: 'card col-md-12' }, 
            h('img', { src: image.toString(), className: 'img-fluid rounded' }),
            h('div', { className: 'card-body' }, 
              h('h5', { className: 'card-title' }, entry.getIn(['data', 'title']) ),
              h('p', { classname: 'card-text' }, entry.getIn(['data', 'body']),
              h('p', { className: 'small font-weight-light mt-3' }, `Created On: ${entry.getIn(['data', 'date'])}` )
            ),
    
            widgetsFor('categories').map( function(category) {
              return h('span', { className: 'badge badge-primary mr-3 p-2' }, `${category.getIn(['data'])}`)
            })
          )    
        )
      )
    )
  }
})

CMS.registerPreviewTemplate('posts', PostPreview)