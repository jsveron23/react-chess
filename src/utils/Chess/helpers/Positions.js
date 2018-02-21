const Positions = {
  parse (position, isStream = false) {
    const [file, rank] = position.split('')

    return isStream
      ? [file, rank]
      : { file, rank }
  }
}

export default Positions
