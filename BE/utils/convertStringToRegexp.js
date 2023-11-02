const convertStringToRegexp = (text) => {
    let regexp = '';
    let textNormalized = text
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // remove all accents
      .replace(/[|\\{}()[\]^$+*?.]/g, '\\$&') // remove all regexp reserved char
      .toLowerCase();
    // Gen All Character vietnam
    textNormalized = '.*' + textNormalized + '.*';
    regexp = textNormalized
      .replace(
        /a/g,
        '[a,á,à,ả,ã, ạ, â, ấ, ầ, ẩ, ẫ, ậ, ă, ắ, ằ, ẳ, ẵ, ặ, ạ, ả, ã, á, à, ậ, ả̂, ã̂]',
      )
      .replace(/e/g, '[e,é,è,ê,ẻ, ể, ẽ, ế, ề, ệ,ễ,ẹ,ê,ẻ,ẽ,é,è,ệ,ẻ̂,ẽ̂]')
      .replace(/d/g, '[d,đ]')
      .replace(/y/g, '[y,ý,ỳ,ỷ,ỹ,ỵ]')
      .replace(/i/g, '[i,í,ì,î,ỉ,ị,ĩ,ỉ]')
      .replace(/o/g, '[o,ó,ò,õ,ô,ố,ồ,ổ,ộ,ỗ,ớ,ờ,ợ,ở,ỡ,ơ]')
      .replace(/u/g, '[u,ü,ú,ù,û,ủ,ụ,ũ,ư,ứ,ừ,ự,ử,ữ]');
    return new RegExp(regexp, 'i'); // "i" -> ignore case
  };
module.exports = convertStringToRegexp;