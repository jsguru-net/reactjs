import PropTypes from 'prop-types';

const RedComponent = ({text}) => <div style={{color:'red'}}>{text || 'Red'}</div>;
const GreenComponent = ({text}) => <div style={{color:'green'}}>{text || 'Green'}</div>;
const BlueComponent = ({text}) => <div style={{color:'blue'}}>{text || 'Blue'}</div>;

const components = {
    red: RedComponent,
    green: GreenComponent,
    blue: BlueComponent,
}

const ReactHookSample = (props) => {
    const {children, ...properties} = props;
    
    return (
        <>
            {['red','green','blue'].map(color => {
                const CName = components[color];
                return <CName key={color} {...properties} />
            })}
            {children}
        </>
    )
}

ReactHookSample.propTypes  = {
    children: PropTypes.arrayOf(PropTypes.element) || PropTypes.element.isRequired,
    // color: PropTypes.oneOf(['red','green','blue'])
    text: PropTypes.string
}

export default ReactHookSample;