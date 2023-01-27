<x-app-layout>
    <div align='center'>
        後で解く問題
    </div>
    @component('components/questions_for_mypage', ['questions' => $questions, 'flag_type' => $flag_type, 'method' => 'PUT'])@endcomponent
    
</x-app-layout>