<x-app-layout>
    @component('components/questions_for_mypage', ['questions' => $questions, 'flag_type' => $flag_type, 'method' => 'PUT'])@endcomponent
    
</x-app-layout>