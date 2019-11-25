import React from "react"
import { faGithubSquare } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./style.scss"

const SourceCodeButton = ({ url }) =>
  <div id="source-code-button">
    <a
      title="Check source code on github"
      className="btn btn-light border border-success "
      href={url}
    >
      <FontAwesomeIcon icon={faGithubSquare} alt="source" />
    </a>
  </div>
export default SourceCodeButton