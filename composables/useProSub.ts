export default function() {
    return {
        isOpen: useState('isOpen', () => false)
    }
}