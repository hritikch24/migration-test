import styled from 'styled-components'

interface ModalBodyProps {
  show: boolean
}

export const ModalBody = styled.div<ModalBodyProps>`
  display: ${(props) => (props.show ? 'block' : 'none')};
  position: fixed;
  z-index: 100000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background: rgba(15, 16, 23, 0.9);
`

export const ModalContent = styled.div<any>`
  padding: 20px;
  background-color: white;
  display: inline-block;
  border-radius: 8px;
  margin: 0 auto;
  border: none;
  border-radius: 4px;
  overflow: visible;
  // min-width: 280px;
  position: absolute;
  left: 50%;
  right: 50%;
  top: 35%;
  transform: translate(-50%, -50%);
  max-height: 100%;
  // overflow-y: auto;
  ::-webkit-scrollbar {
    width: 0 !important;
  }
  overflow: -moz-scrollbars-none;
  -ms-overflow-style: none;
  width: 80%;
  @media (min-width: 425px) {
    width: 450px;
  }
  h5 {
    font-weight: 400;
    font-size: 12px;
    line-height: 25px;
    color: #8499ae;
    margin: 0;
    @media (min-width: 300px) {
      font-size: 20px;
      line-height: 30px;
    }
  }
`

export const ModelHead = styled.div`
  color: black;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  h2 {
    font-weight: 600;
    font-size: 16px;
    line-height: 25px;
    color: #8499ae;
    margin: 0;
    @media (min-width: 300px) {
      font-size: 20px;
      line-height: 30px;
    }
  }
`

export const Close = styled.img`
  cursor: pointer;
  width: 20px;
  :hover {
    width: 25px;
  }
`
export const FormWrapper = styled.div`
  width: 100%;
`
export const Input = styled.input`
  width: 100%;
  margin-bottom: 12px;
  padding: 15px 40px;
  box-sizing: border-box;
  background: #ebeef1;
  border: 0px;
  outline: none;
  border-radius: 30px;
  font-size: 14px;
`
export const SubmitButton = styled.button`
  background: #827ffe;
  width: 100%;
  text-align: center;
  color: #fff;
  padding: 12px;
  border: none;
  border-radius: 25px;
  cursor: pointer;
`
export const SubmitButtonIcon = styled.i`
  margin-left: 10px;
  font-size: 12px;
`
export const Icons = styled.i`
  position: absolute;
  margin-top: 17px;
  left: 35px;
  color: #9a99aa;
`
