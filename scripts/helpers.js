module.exports = {
  keysToEnglish,
  noteToAccount,
  prettyFormat,
  prettyPrint,
  toDayMonthYear,
  toDdotMdotYYYY,
}


function prettyFormat (account, balance) {
  const paddingStart = 28
  return account.padStart(paddingStart) + ': ' + balance
}


function prettyPrint (account, balance) {
  console.info(prettyFormat(account, balance))
}


function toDayMonthYear (date) {
  return [
    date.getUTCDate(),
    date.getUTCMonth() + 1,
    date.getUTCFullYear(),
  ].join('.')
}


function toDdotMdotYYYY (date) {
  return [
    date.getUTCDate(),
    ('0' + String(date.getUTCMonth() + 1)).slice(-2),
    date.getUTCFullYear(),
  ].join('.')
}


function keysToEnglish (object) {
  const newObject = {}
  Object.entries(object)
    .forEach(entry => {
      // Order of replacements is important!
      const newKey = entry[0]
        .replace('Auftragskonto', 'tracking-account')
        .replace('Auftraggeber / Begünstigter', 'from')
        .replace('Beschreibung', 'note')
        .replace('Betrag (EUR)', 'amount')
        .replace('Betrag', 'amount')
        .replace('Belegdatum', 'entry-utc')
        .replace('BIC (SWIFT-Code)', 'bic')
        .replace('BLZ', 'bank-code')
        .replace('Buchungsdatum', 'entry-utc')
        .replace('Buchungstag', 'entry-utc')
        .replace('Buchungstext', 'type')
        .replace('Gläubiger-ID', 'creditor-id')
        .replace('Info', 'info')
        .replace('Kontonummer', 'account-id')
        .replace('Kontonummer/IBAN', 'account-id')
        .replace('Kundenreferenz (End-to-End)', 'end-to-end-id')
        .replace('Kundenreferenz', 'customer-id')
        .replace('Mandatsreferenz', 'mandate')
        .replace('Ursprünglicher Betrag', 'original-amount')
        .replace('Valuta', 'value-utc')
        .replace('Verwendungszweck', 'note')
        .replace('Waehrung', 'currency')
        .replace('Wertstellung', 'value-utc')

      newObject[newKey] = entry[1]
    })
  return newObject
}


function noteToAccount (note) {
  // Sorted by ascending importance
  // I.e. later keywords overwrite selection
  const mappings = {
    'paypal': 'paypal',
    'rewe': 'rewe',
    'amazon': 'amazon',
    'amazon prime': 'amazon:prime',
    'patreon': 'patreon',
    'google ireland limited cloud platform': 'google:cloud',
    'day night sports gmbh': 'day_night_sports',
    'spotify': 'spotify',
    'apple': 'apple',
    'itunes': 'apple:itunes',
    'mozilla': 'mozilla',
    'namecheap': 'namecheap',
    'name-cheap': 'namecheap',
    'irccloud': 'irccloud',
    'flattr': 'flattr',
    'u s metric association': 'us_metric_association',
    'github': 'github',
    'digitalocean': 'digitalocean',
    'easyjet': 'easyjet',
    'linode': 'linode',
    'macy\'\'s': 'macys',
    'flightfox': 'flightfox',
    'hyperhq': 'hyperhq',
    'at&t': 'at-and-t',
    'remote year': 'remote_year',
    'ergodox ez': 'ergodox_ez',
    'starbucks': 'starbucks',
    'stdlib': 'stdlib',
    'uber.com': 'uber',
    'walgreens': 'walgreens',

    // German
    'auslandseinsatz': 'dkb:visa',
    'db bahn': 'deutsche_bahn',
    'db vertrieb gmbh': 'deutsche_bahn',
    'deutsche post ag': 'deutsche_post',
    'e-plus service gmbh': 'eplus',
    'ebay gmbh': 'ebay',
    'edeka': 'edeka',
    'huk24 ag': 'huk24',
    'lidl': 'lidl',
    'nextbike gmbh': 'nextbike',
    'rossmann': 'rossmann',
    'siehe anlage': ' ',
    'spar dankt': 'spar',
    'sparda-bank': 'sparda',
    'united domains ag': 'united_domains',
  }
  let account = note

  Object.entries(mappings)
    .forEach(entry => {
      if (note.toLowerCase().includes(entry[0])) {
        account = entry[1]
      }
    })

  return account
}
